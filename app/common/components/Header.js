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
                        <a href='/'>Soundcloud Radio</a>
                    </h1>
                    <div className='nav'>
                        <ul className='nav-list horizontal'>
                            <li className='nav-item'><a data-scroll href='#getstarted'>Get Started</a></li>
                            <li className='nav-item'><a data-scroll href='#usage'>How To Use</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
