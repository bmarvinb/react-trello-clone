import { Input } from 'antd';
import React, { Component } from 'react';

export class FormCreation extends Component {
    state = {
        text: '',
        loading: false,
    };

    handleCreate = (event, callback, text) => {
        event.preventDefault();
        if (this.state.loading) {
            return;
        }

        this.setState(() => ({ loading: true }));
        callback(text).then(() => this.setState(() => ({ text: '', loading: false })));
    };

    handleInputChange = event => {
        this.setState({ text: event.target.value });
    };

    render() {
        const { onCreate, placeholder } = this.props;
        const { text } = this.state;
        return (
            <form onSubmit={event => this.handleCreate(event, onCreate, text)}>
                <Input
                    onChange={event => this.handleInputChange(event)}
                    value={this.state.text}
                    placeholder={placeholder}
                    disabled={this.state.loading}
                />
            </form>
        );
    }
}
