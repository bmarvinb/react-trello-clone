import { Form, Icon, Input } from 'antd';
import React, { Component } from 'react';

import { byPropKey } from '../../utils';
import { ErrorMessage } from './ErrorMessage';
import { FormButton } from './FormButton';
import { FormContainer } from './FormContainer';

const SignUpForm = ({ form, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, serConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const FormItem = Form.Item;

    const onsubmit = event => {
        event.preventDefault();
        const submitButton = document.querySelector('.signup-form-button');
        submitButton.disabled = true;
        if (newPassword !== confirmPassword) {
            setError('new password and confirm password do not match');
        } else {
            onSubmit(email, newPassword, username)
                .then(() => {
                    submitButton.disabled = false;
                })
                .catch(error => {
                    submitButton.disabled = false;
                    setError(error.message);
                });
        }
    };

    const { getFieldDecorator } = form;

    return (
        <FormContainer>
            <h1 className="title">Sign Up</h1>
            <Form onSubmit={event => onsubmit(event)} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onChange={event => setUsername(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            onChange={event => setEmail(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: 'Please input your new password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={event => setNewPassword(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: 'Please input your confirm password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm password"
                            onChange={event => serConfirmPassword(event.target.value)}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <FormButton type="primary" htmlType="submit" className="login-form-button signup-form-button">
                        Sign Up
                    </FormButton>
                </FormItem>
                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

const WrappedSignUpForm = Form.create()(SignUpForm);

export default WrappedSignUpForm;
