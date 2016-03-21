import React, { Component, PropTypes } from 'react';
import SubHeading from './SubHeading';

export default class CustomizeRadioPanel extends Component {
    constructor(props) {
        super(props);
    }

    handleInputChange(e) {
        const { onCustomizeChange } = this.props;
        const title = this.refs['customize-radio-title'].value;
        const genres = this.refs['customize-radio-genres'].value;
        const tags = this.refs['customize-radio-tags'].value;
        onCustomizeChange(title, genres, tags);
    }

    render() {
        const { info } = this.props;
        return (
            <div className='customize-radio-panel'>
                <SubHeading title='Customize' />
                <div className='form-group'>
                     <label className='form-label'>Playlist Title</label>
                     <input type='text' onChange={e => this.handleInputChange(e)} ref='customize-radio-title' className='form-content input-field' />
                </div>
                <div className='column-wrapper'>
                    <div className='column form-group'>
                        <label className='form-label'>Genres</label>
                        <input type='text' onChange={e => this.handleInputChange(e)} ref='customize-radio-genres' className='form-content input-field' />
                    </div>
                    <div className='column form-group'>
                        <label className='form-label'>Tags</label>
                        <input type='text' onChange={e => this.handleInputChange(e)} ref='customize-radio-tags' className='form-content input-field' />
                    </div>
                </div>
                <div className='form-group'>
                     <label className='form-label'>Playlist URL</label>
                     <input type='text' className='form-content input-field' value={info.get('playlistUrl')} readOnly/>
                </div>
                <div className='download-button-wrapper'>
                    <a href={info.get('playlistUrl')} className='default-button' >Download playlist</a>
                </div>
            </div>
        )
    }
}

CustomizeRadioPanel.propTypes = {
    info: PropTypes.object.isRequired,
    onCustomizeChange: PropTypes.func.isRequired
}
