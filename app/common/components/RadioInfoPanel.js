import React, { Component, PropTypes } from 'react';

export default class RadioInfoPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { info } = this.props;
        let genres = 'None';
        let tags = 'None';
        if (info.genres.length > 0) {
            genres = info.genres.join(', ');
        }
        if (info.tags.length > 0) {
            tags = info.tags.join(', ');
        }

        return (
            <div className='radio-info-panel'>
                <div className='column-wrapper'>
                    <div className='column'>
                        <label className='info-label'>Genres</label>
                        <span className='info-content'>{genres}</span>
                    </div>
                    <div className='column'>
                        <label className='info-label'>Tags</label>
                        <span className='info-content'>{tags}</span>
                    </div>
                </div>
                <div>
                    <label className='info-label'>URL</label>
                    <input type='text' className='info-content input-field' value={info.url} readOnly/>
                </div>
            </div>
        )
    }
}

RadioInfoPanel.propTypes = {
    info: PropTypes.object.isRequired
}
