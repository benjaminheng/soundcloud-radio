import React, { Component, PropTypes } from 'react';

export default class Section extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, titleId, children } = this.props;
        let className = 'section';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <div className={className}>
                {title &&
                    <h1 id={titleId} className='title'>{title}</h1>
                }
                {children}
            </div>
        );
    }
}

Section.propTypes = {
    title: PropTypes.string,
    titleId: PropTypes.string,
    className: PropTypes.string
}
