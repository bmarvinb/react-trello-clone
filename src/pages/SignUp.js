import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input } from 'antd';
import { isEmail } from 'validator';

import { LANDING } from '../core/routes/routes';
import { createUser } from '../core/api/db';
import { createUserWithEmailAndPassword } from '../core/api/auth';
import { EMAIL_ERROR_TYPES } from '../auth/constants';
import { FormContainer } from '../auth/components/FormContainer';
import { FormButton } from '../auth/components/FormButton';
import { ErrorMessage } from '../auth/components/ErrorMessage';

const SignUpForm = ({ form, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, serConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailInputErr, setEmailInputErr] = useState({
        status: '',
        message: '',
    });

    const handleSubmit = event => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('new password and confirm password do not match');
            return;
        }

        const submitButton = document.querySelector('.signup-form-button');

        setEmailInputErr({
            status: '',
            message: '',
        });
        submitButton.disabled = true;
        onSubmit(email, newPassword, username)
            .then(() => {
                submitButton.disabled = false;
            })
            .catch(error => {
                submitButton.disabled = false;
                setError(error.message);
            });
    };

    const handleEmailInputBlur = event => {
        if (isEmail(event.target.value)) {
            return;
        }

        setEmailInputErr({
            status: EMAIL_ERROR_TYPES.INVALID.STATUS,
            message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
        });
    };

    return (
        <FormContainer>
            <h1 className="title">Sign Up</h1>
            <Form onSubmit={event => handleSubmit(event)} className="login-form">
                <Form.Item>
                    {form.getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onChange={event => setUsername(event.target.value)}
                        />
                    )}
                </Form.Item>

                <Form.Item validateStatus={emailInputErr.status} help={emailInputErr.message}>
                    {form.getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            onChange={event => setEmail(event.target.value)}
                            onBlur={handleEmailInputBlur}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {form.getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: 'Please input your new password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={event => setNewPassword(event.target.value)}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {form.getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: 'Please input your confirm password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm password"
                            onChange={event => serConfirmPassword(event.target.value)}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <FormButton type="primary" htmlType="submit" className="login-form-button signup-form-button">
                        Sign Up
                    </FormButton>
                </Form.Item>

                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

class SignUpScreen extends Component {
    async onSubmit(email, password, username) {
        return createUserWithEmailAndPassword(email, password).then(authUser => {
            createUser(authUser.user.uid, username, email);
            window.location = LANDING;
        });
    }

    render() {
        const WrappedSignUpForm = Form.create()(SignUpForm);

        return <WrappedSignUpForm onSubmit={this.onSubmit} />;
    }
}

export const WrappedSignUpPage = withRouter(SignUpScreen);
