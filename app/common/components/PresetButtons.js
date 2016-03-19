import React, { Component, PropTypes } from 'react';
import SelectionButton from './SelectionButton';

export default class PresetButtons extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedPreset, presets, onPresetSelect } = this.props;
        return (
            <div>
                {Object.keys(presets).map(key =>
                    <SelectionButton key={key} selected={key === selectedPreset} text={key} clickHandler={onPresetSelect} />
                )}
            </div>
        )
    }
}

PresetButtons.propTypes = {
    selectedPreset: PropTypes.string,
    presets: PropTypes.object.isRequired,
    onPresetSelect: PropTypes.func.isRequired
}
