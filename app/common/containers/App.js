import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectPreset } from '../actions';
import config from '../../../config';
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
        if (selectedPreset !== preset) {
            dispatch(selectPreset(preset));
        }
    }

    render() {
        const { selectedPreset } = this.props;
        return (
            <div className='content'>
                <Header />
                <Hero />
                <Section title='Quickstart'>
                    <SubHeading title='Presets' />
                    <PresetButtons selectedPreset={selectedPreset} onPresetSelect={this.onPresetSelect} presets={this.presets} />
                </Section>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
