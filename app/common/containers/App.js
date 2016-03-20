import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectPreset, showPresetInfo, hidePresetInfo } from '../actions';
import config from '../../../config';
import util from '../utils/util';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SubHeading from '../components/SubHeading';
import PresetButtons from '../components/PresetButtons';
import RadioInfoPanel from '../components/RadioInfoPanel';

class App extends Component {
    constructor(props) {
        super(props);
        this.presets = config.presets;
        this.onPresetSelect = this.onPresetSelect.bind(this);
        this.streamEndpoint = `http://${config.hostname}/stream`;
    }

    onPresetSelect(preset) {
        const { dispatch, selectedPreset } = this.props;
        // Update selectedPreset if new selection is made, else toggle visibility
        if (selectedPreset.get('name') !== preset) {
            let info = this.presets[preset];
            const params = { genres: info.genres, tags: info.tags };
            info.url = util.buildUrl(this.streamEndpoint, params);
            dispatch(selectPreset(preset, info));
            dispatch(showPresetInfo());
        } else {
            dispatch(selectPreset(null));
            dispatch(hidePresetInfo());
        }
    }

    render() {
        const { selectedPreset } = this.props;
        const presetInfo = selectedPreset.get('info').toJS();
        return (
            <div className='content'>
                <Header />
                <Hero />
                <Section title='Get Started'>
                    <SubHeading title='Presets' />
                    <PresetButtons selectedPreset={selectedPreset.get('name')} onPresetSelect={this.onPresetSelect} presets={this.presets} />
                    {presetInfo.visible &&
                        <RadioInfoPanel info={presetInfo} />
                    }
                </Section>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
