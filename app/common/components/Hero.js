import React, { Component } from 'react';

export default class Hero extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='hero'>
                <div className='hero-content-wrapper'>
                    <div className='hero-content'>
                        <h1 className='title'>Customized radio stations</h1>
                        <span className='caption'>
                            <p>Listen to your <span className='highlight'>favorite music</span> anywhere, using your <span className='highlight'>favorite audio player</span>. Stream music to Winamp, foobar2000, iTunes, and many more!</p>
                            <p>Powered by SoundCloud.</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

