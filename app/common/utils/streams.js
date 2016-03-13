import request from 'request';
import { PassThrough, Writable } from 'stream';
import buffer from 'buffer';

export default class Streams {
    constructor(dest) {
        this.lastStream = undefined;
        this.dest = dest;
        this.length = 0;
        this.writer = new Writer(16000, dest);
    }

    pushUrl(url, title) {
        this.push(request.get(url).pipe(PassThrough()), title);
    }

    push(stream, title) {
        if (typeof this.lastStream !== 'undefined') {
            this.lastStream.on('end', () => {
                this.writer.queue(title);
                stream.pipe(this.writer, {end: false});
            });
        } else {
            this.writer.queue(title);
            stream.pipe(this.writer, {end: false});
        }
        this.lastStream = stream;
    }
}

class Writer extends Writable {
    constructor(metaint, dest, opts) {
        super();
        this.metaBlockSize = 16;
        this.maxLength = this.metaBlockSize * 255;
        this.noMetadata = new Buffer([0]);
        this.metaint = metaint;
        this.metaQueue = [];
        this.dest = dest;

        this.bytesLeft = metaint;
    }

    stringify(obj) {
        let s = [];
        Object.keys(obj).forEach(function (key) {
            s.push(key);
            s.push('=\'');
            s.push(obj[key]);
            s.push('\';');
        });
        return s.join('');
    }

    queue(metadata) {
        if (typeof metadata === 'string') {
            metadata = {StreamTitle: metadata};
        }

        if (!('StreamTitle' in metadata)) {
            throw new TypeError('a "StreamTitle" property is required for metadata');
        }

        const str = this.stringify(metadata);
        const len = Buffer.byteLength(str);

        if (len > this.maxLength) {
            throw new Error('metadata must be <= 4080, got: ' + len);
        }

        const metaLengthByte = Math.ceil(len / this.metaBlockSize);
        let buf = new Buffer(metaLengthByte * this.metaBlockSize + 1);
        buf[0] = metaLengthByte;
        const written = buf.write(str, 1);
        // pad will NULL bytes
        buf.fill(0, written+1);

        this.metaQueue.push(buf);
    }

    inject() {
        let buffer;
        if (this.metaQueue.length === 0) {
            buffer = this.noMetadata;
        } else {
            buffer = this.metaQueue.shift();
        }
        this.dest.write(buffer);
    }

    process(chunk) {
        // chunk fits within "bytes left" window
        if (chunk.length <= this.bytesLeft) {
            this.writeChunk(chunk);
        } else {
            const limit = this.bytesLeft;
            let buf = chunk.slice(0, limit);
            this.writeChunk(buf);
            buf = chunk.slice(limit);
            this.process(buf);
        }
    }

    writeChunk(chunk) {
        this.bytesLeft -= chunk.length;
        this.dest.write(chunk);
        if (this.bytesLeft === 0) {
            this.inject();
            this.bytesLeft = this.metaint;
        }
    }

    _write(chunk, encoding, next) {
        this.process(chunk);
        next();
    }

    _writev(chunks, next) {
        next();
    }
}
