import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SubHeading from '../components/SubHeading';
import SelectionButton from '../components/SelectionButton';

class App extends Component {
    constructor(props) {
        super(props);
        this.onPresetSelect.bind(this);
    }

    onPresetSelect(preset) {
        console.log(preset);
    }

    render() {
        return (
            <div className='content'>
                <Header />
                <Hero />
                <Section title='Quickstart'>
                    <SubHeading title='Presets' />
                    <SelectionButton text='electronic' clickHandler={this.onPresetSelect} />
                    <SelectionButton text='chillstep' selected={true} clickHandler={this.onPresetSelect} />
                    <SelectionButton text='drumstep' clickHandler={this.onPresetSelect} />
                </Section>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
