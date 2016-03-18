import { connect } from 'react-redux';
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='content'>
                hello world
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
