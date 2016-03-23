import React, { Component } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='header-wrapper'>
                <div className='header'>
                    <h1 className='title'>
                        Soundcloud Radio
                    </h1>
                    <div className='nav'>
                        <ul className='horizontal'>
                            <li className='nav-link'><a href='#getstarted'>Get Started</a></li>
                            <li className='nav-link'><a href='#usage'>How To Use</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

