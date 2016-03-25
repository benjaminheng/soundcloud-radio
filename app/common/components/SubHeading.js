import React, { Component, PropTypes } from 'react';

export default class SubHeading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title } = this.props;
        return (
            <div className='sub-heading'>
                {title}
            </div>
        );
    }
}

SubHeading.propTypes = {
    title: PropTypes.string.isRequired
}
