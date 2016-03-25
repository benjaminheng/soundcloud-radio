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
        const selectedPreset = selectedRadio.get('preset');
        const info = util.getStreamInfo(title, genres, tags);
        if (selectedPreset !== 'custom') {
            dispatch(selectRadio('custom'));
        }
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
                <ol className='big-list'>
                    <li className='list-item'>
                        <span className='list-item-content'>Download a playlist</span>
                    </li>
                    <p>Select a preset playlist or customize one in the <a href='#getstarted'>Get Started</a> section.</p>
                    <p>Choose a title to identify your new playlist, then choose some of your favorite genres and tags. Click on the download button for your playlist file (.PLS format).</p>
                    <li className='list-item'>
                        <span className='list-item-content'>Import the playlist to your favorite player</span>
                    </li>
                    <SubHeading title='General Instructions' />
                    <p>Most modern players support playlist streams. Usually, there will be a <strong>Load Playlist</strong> option in the file menu. You may also be able to <strong>drag-and-drop</strong> the downloaded playlist directly into your player.</p>
                    <SubHeading title='foobar2000' />
                    <ol>
                        <li>Select <strong>File</strong> > <strong>Load Playlist</strong></li>
                        <li>Browse to your playlist and click <strong>Open</strong></li>
                    </ol>
                    <SubHeading title='WinAMP' />
                    <ol>
                        <li>Select <strong>File</strong> > <strong>Open Playlist</strong></li>
                        <li>Browse to your playlist and click <strong>Open</strong></li>
                    </ol>
                    <SubHeading title='iTunes' />
                    <ol>
                        <li><em>(Windows)</em> Enable the menu bar by pressing <strong>Control+B</strong></li>
                        <li>Select <strong>File</strong> > <strong>Library</strong> > <strong>Import Playlist</strong></li>
                        <li>Browse to your playlist and click <strong>Open</strong></li>
                    </ol>
                </ol>
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
