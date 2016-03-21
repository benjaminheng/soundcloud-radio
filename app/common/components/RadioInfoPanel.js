import React, { Component, PropTypes } from 'react';

export default class RadioInfoPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { info } = this.props;
        const playlistUrl = info.get('playlistUrl');
        let genres = 'None';
        let tags = 'None';
        if (info.get('genres').size > 0) {
            genres = info.get('genres').join(', ');
        }
        if (info.get('tags').size > 0) {
            tags = info.get('tags').join(', ');
        }

        return (
            <div className='radio-info-panel'>
                <div className='column-wrapper'>
                    <div className='column form-group'>
                        <label className='form-label'>Genres</label>
                        <span className='form-content'>{genres}</span>
                    </div>
                    <div className='column form-group'>
                        <label className='form-label'>Tags</label>
                        <span className='form-content'>{tags}</span>
                    </div>
                </div>
                <div className='form-group'>
                     <label className='form-label'>Playlist URL</label>
                     <input type='text' className='form-content input-field' value={playlistUrl} readOnly/>
                </div>
                <div className='download-button-wrapper'>
                    <a href={playlistUrl} className='default-button'>Download playlist</a>
                </div>
            </div>
        )
    }
}

RadioInfoPanel.propTypes = {
    info: PropTypes.object.isRequired
}
