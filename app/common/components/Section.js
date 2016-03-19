import React, { Component, PropTypes } from 'react';

export default class Section extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children } = this.props;
        let className = 'section';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <div className={className}>
                {title &&
                    <h1 className='title'>{title}</h1>
                }
                {children}
            </div>
        );
    }
}

Section.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string
}
