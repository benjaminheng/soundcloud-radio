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
                            <li><a className='nav-link' href='#'>How to use</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

