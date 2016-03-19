import React, { Component, PropTypes } from 'react';

export default class SelectionButton extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        const { text, clickHandler } = this.props;
        e.preventDefault();
        clickHandler(text);
    }

    render() {
        const { text, selected } = this.props;
        let className = 'selection-button';
        if (selected) {
            className += ' selected';
        }
        return (
            <button className={className} onClick={e => this.handleClick(e)}>
                {text}
            </button>
        );
    }
}

SelectionButton.propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    selected: PropTypes.bool
}

SelectionButton.defaultProps = {
    selected: false
}
