import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectPreset, showPresetInfo } from '../actions';
import config from '../../../config';
import util from '../utils/util';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SubHeading from '../components/SubHeading';
import PresetButtons from '../components/PresetButtons';

class App extends Component {
    constructor(props) {
        super(props);
        this.presets = config.presets;
        this.onPresetSelect = this.onPresetSelect.bind(this);
    }

    onPresetSelect(preset) {
        const { dispatch, selectedPreset } = this.props;
        if (selectedPreset.get('name') !== preset) {
            let info = this.presets[preset];
            info.url = 'http://example.com';
            dispatch(selectPreset(preset, info));
        }
        dispatch(showPresetInfo());
    }

    render() {
        const { selectedPreset } = this.props;
        return (
            <div className='content'>
                <Header />
                <Hero />
                <Section title='Quickstart'>
                    <SubHeading title='Presets' />
                    <PresetButtons selectedPreset={selectedPreset.get('name')} onPresetSelect={this.onPresetSelect} presets={this.presets} />
                </Section>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
