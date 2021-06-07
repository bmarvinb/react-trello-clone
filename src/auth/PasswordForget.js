import { Form, Icon, Input } from 'antd';
import React, { Component } from 'react';
import { isEmail } from 'validator';

import { byPropKey } from '../utils';
import { doPasswordReset } from './api/auth';
import { ErrorMessage } from './components/ErrorMessage';
import { FormButton } from './components/FormButton';
import { FormContainer } from './components/FormContainer';
import { EMAIL_ERROR_TYPES } from './components/constants';

const FormItem = Form.Item;

const INITIAL_STATE = {
    email: '',
    error: null,
    emailInputErr: {
        status: '',
        message: ''
    }
};

class PasswordForgetScreen extends Component {
    state = { ...INITIAL_STATE };

    async handleSubmit(event) {
        event.preventDefault();

        const { email } = this.state;
        this.resetEmailInputErr();

        this.props.onSubmit(email).catch(error => {
            this.setState(byPropKey('error', error.message));
        });

        return doPasswordReset(email);
    }

    resetEmailInputErr = () => {
        this.setState(byPropKey('emailInputErr', {
            status: '',
            message: ''
        }));
    };

    handleEmailInputBlur = event => {
        const isEmailValid = isEmail(event.target.value);
        if (!isEmailValid) {
            this.setState(byPropKey('emailInputErr', {
                status: EMAIL_ERROR_TYPES.INVALID.STATUS,
                message: EMAIL_ERROR_TYPES.INVALID.MESSAGE
            }));
        } else {
            this.resetEmailInputErr();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error } = this.state;

        return (
            <FormContainer>
                <h1 className="title">Password Forget</h1>
                <Form onSubmit={event => this.handleSubmit(event)} className="login-form">
                    <FormItem
                        validateStatus={this.state.emailInputErr.status}
                        help={this.state.emailInputErr.message}
                    >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                                onChange={event => this.setState(byPropKey('email', event.target.value))}
                                onBlur={event => this.handleEmailInputBlur(event)}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <FormButton type="primary" htmlType="submit" className="login-form-button">
                            Restore
                        </FormButton>
                    </FormItem>
                    <ErrorMessage>{error}</ErrorMessage>
                </Form>
            </FormContainer>
        );
    }
}

export default Form.create()(PasswordForgetScreen);
