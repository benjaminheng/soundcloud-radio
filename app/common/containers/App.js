import { connect } from 'react-redux';
import React, { Component } from 'react';
import { updateSelectedRadio, selectRadio } from '../actions';
import config from '../../../config';
import util from '../utils/util';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SubHeading from '../components/SubHeading';
import PresetButtons from '../components/PresetButtons';
import CustomizeRadioPanel from '../components/CustomizeRadioPanel';
import Footer from '../components/Footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.presets = config.presets;
        this.onPresetSelect = this.onPresetSelect.bind(this);
        this.onInfoChange = this.onInfoChange.bind(this);
    }

    onPresetSelect(preset) {
        const { dispatch, selectedRadio } = this.props;
        const selectedPreset = selectedRadio.get('preset');
        if (selectedPreset !== preset) {
            dispatch(selectRadio(preset));
            let info = this.presets[preset];
            info = util.getStreamInfo(info.title, info.genres, info.tags);
            dispatch(updateSelectedRadio(info));
        }
    }

    onInfoChange(title, genres, tags) {
        const { dispatch, selectedRadio } = this.props;
        const info = util.getStreamInfo(title, genres, tags);
        dispatch(selectRadio('custom'));
        dispatch(updateSelectedRadio(info));
    }

    render() {
        const { selectedRadio, customRadio } = this.props;
        const presetInfo = selectedRadio.get('info');

        return (
            <div className='content'>
                <Header />
                <Hero />
                <Section title='Get Started' titleId='getstarted' className='get-started'>
                    <CustomizeRadioPanel onPresetSelect={this.onPresetSelect} presets={this.presets} radio={selectedRadio} onInfoChange={this.onInfoChange} />
                </Section>
                
                <Section title='How To Use' titleId='usage' className='usage ss-style-doublediagonal'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Section>

                <Footer />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
