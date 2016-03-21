import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectPreset, showPresetInfo, hidePresetInfo, updateCustomRadio } from '../actions';
import config from '../../../config';
import util from '../utils/util';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SubHeading from '../components/SubHeading';
import PresetButtons from '../components/PresetButtons';
import RadioInfoPanel from '../components/RadioInfoPanel';
import CustomizeRadioPanel from '../components/CustomizeRadioPanel';

class App extends Component {
    constructor(props) {
        super(props);
        this.presets = config.presets;
        this.onPresetSelect = this.onPresetSelect.bind(this);
        this.onCustomizeChange = this.onCustomizeChange.bind(this);
    }

    onPresetSelect(preset) {
        const { dispatch, selectedPreset } = this.props;
        // Update selectedPreset if new selection is made, else toggle visibility
        if (selectedPreset.get('name') !== preset) {
            let info = this.presets[preset];
            let params = { 
                genres: info.genres, 
                tags: info.tags,
            };

            info.streamUrl = util.buildUrl(util.STREAM_ENDPOINT, params);
            params.title = info.title;
            info.playlistUrl = util.buildUrl(util.PLAYLIST_ENDPOINT, params);

            dispatch(selectPreset(preset, info));
            dispatch(showPresetInfo());
        } else {
            dispatch(selectPreset(null));
            dispatch(hidePresetInfo());
        }
    }

    onCustomizeChange(title, genres, tags) {
        const { dispatch } = this.props;
        // if empty string, assign an empty array, else split by ','
        genres = genres === '' ? [] : genres.split(',');
        tags = tags === '' ? [] : tags.split(',');

        let params = { genres, tags };
        let info = { title, genres, tags };
        info.streamUrl = util.buildUrl(util.STREAM_ENDPOINT, params);
        params.title = title;
        info.playlistUrl = util.buildUrl(util.PLAYLIST_ENDPOINT, params);

        dispatch(updateCustomRadio(info));
    }

    render() {
        const { selectedPreset, customRadio } = this.props;
        const presetInfo = selectedPreset.get('info');

        return (
            <div className='content'>
                <Header />
                <Hero />
                <Section title='Get Started'>
                    <SubHeading title='Presets' />
                    <PresetButtons selectedPreset={selectedPreset.get('name')} onPresetSelect={this.onPresetSelect} presets={this.presets} />
                    {presetInfo.get('visible') &&
                        <RadioInfoPanel info={presetInfo} />
                    }
                    <CustomizeRadioPanel info={customRadio} onCustomizeChange={this.onCustomizeChange} />
                </Section>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
