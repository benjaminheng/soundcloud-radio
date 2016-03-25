import React, { Component, PropTypes } from 'react';
import SubHeading from './SubHeading';
import PresetButtons from './PresetButtons';

export default class CustomizeRadioPanel extends Component {
    constructor(props) {
        super(props);
    }

    handleInputChange(e) {
        const { onInfoChange } = this.props;
        const title = this.refs['customize-radio-title'].value;
        const genres = this.refs['customize-radio-genres'].value;
        const tags = this.refs['customize-radio-tags'].value;
        onInfoChange(title, genres, tags);
    }

    render() {
        const { radio, presets, onPresetSelect } = this.props;
        const genres = radio.getIn(['info', 'genres']);
        const tags = radio.getIn(['info', 'tags']);
        return (
            <div className='customize-radio-panel'>
                <SubHeading title='Customize' />
                <PresetButtons selectedPreset={radio.get('preset')} onPresetSelect={onPresetSelect} presets={presets} />
                <div className='form-group'>
                     <label className='form-label'>Playlist Title</label>
                     <input type='text' maxLength={128} value={radio.getIn(['info', 'title'])} onChange={e => this.handleInputChange(e)} ref='customize-radio-title' className='form-content input-field' />
                </div>
                <div className='column-wrapper'>
                    <div className='column form-group'>
                        <label className='form-label'>Genres</label>
                        <input type='text' maxLength={128} value={genres} onChange={e => this.handleInputChange(e)} ref='customize-radio-genres' className='form-content input-field' />
                    </div>
                    <div className='column form-group'>
                        <label className='form-label'>Tags</label>
                        <input type='text' maxLength={128} value={tags} onChange={e => this.handleInputChange(e)} ref='customize-radio-tags' className='form-content input-field' />
                    </div>
                </div>
                <div className='download-button-wrapper'>
                    <a href={radio.getIn(['info', 'playlistUrl'])} className='default-button' >Download playlist</a>
                </div>
            </div>
        )
    }
}

CustomizeRadioPanel.propTypes = {
    radio: PropTypes.object.isRequired,
    onInfoChange: PropTypes.func.isRequired,
    presets: PropTypes.object.isRequired,
    onPresetSelect: PropTypes.func.isRequired
}

CustomizeRadioPanel.defaultProps = {
    selectedPreset: 'custom'
}
