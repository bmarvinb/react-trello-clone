import { Form, Icon, Input } from 'antd';
import React, { Component } from 'react';

import { BOARDS } from '../../core/routes/routes';
import { byPropKey } from '../../utils';
import { doSignInWithEmailAndPassword } from '../api/auth';
import { ErrorMessage } from './ErrorMessage';
import { FormButton } from './FormButton';
import { FormContainer } from './FormContainer';

const FormItem = Form.Item;

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    state = { ...INITIAL_STATE };

    async onSubmit(event) {
        event.preventDefault();

        const { email, password } = this.state;
        const { history } = this.props;

        return doSignInWithEmailAndPassword(email, password)
            .then(() => {
                history.push(BOARDS);
            })
            .catch(error => {
                this.setState(byPropKey('error', error.message));
            });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error } = this.state;

        return (
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={event => this.onSubmit(event)}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                                onChange={event => this.setState(byPropKey('email', event.target.value))}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                onChange={event => this.setState(byPropKey('password', event.target.value))}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <FormButton type="primary" htmlType="submit">
                            Log in
                        </FormButton>
                    </FormItem>
                    <ErrorMessage>{error}</ErrorMessage>
                </Form>
            </FormContainer>
        );
    }
}

export const WrappedSignInForm = Form.create()(SignInForm);
