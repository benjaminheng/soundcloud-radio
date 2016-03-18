import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='content'>
                <Header />
                <Hero />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
