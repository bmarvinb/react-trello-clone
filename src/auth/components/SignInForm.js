import { Form, Icon, Input } from 'antd';
import React, { Component, useState } from 'react';
import { isEmail } from 'validator';

import { BOARDS } from '../../core/routes/routes';
import { byPropKey } from '../../utils';
import { doSignInWithEmailAndPassword } from '../api/auth';
import { ErrorMessage } from './ErrorMessage';
import { FormButton } from './FormButton';
import { FormContainer } from './FormContainer';
import { useStateValue } from '../api/StateProvider';
import { actionTypes } from '../api/reducer';
import { auth, provider } from '../../core/api/firebase';
import { EMAIL_ERROR_TYPES } from './constants';

const SignInForm = ({ history, form }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailInputErr, setEmailInputErr] = useState({
        status: '',
        message: '',
    });
    const [{}, dispatch] = useStateValue();

    const FormItem = Form.Item;

    const onSubmit = async event => {
        event.preventDefault();
        const submitButton = document.querySelector('.login-form-button');
        submitButton.disabled = true;
        resetEmailInputErr();

        return await doSignInWithEmailAndPassword(email, password)
            .then(() => {
                submitButton.disabled = false;
                history.push(BOARDS);
            })
            .catch(error => {
                submitButton.disabled = false;
                setError(error.message);
            });
    };

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                history.push(BOARDS);
            })
            .catch(error => alert(error.message));
    };

    const { getFieldDecorator } = form;

    const resetEmailInputErr = () => {
        setEmailInputErr({
            status: '',
            message: '',
        });
    };

    const handleEmailInputBlur = event => {
        const isEmailValid = isEmail(event.target.value);
        if (!isEmailValid) {
            setEmailInputErr({
                status: EMAIL_ERROR_TYPES.INVALID.STATUS,
                message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
            });
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={onSubmit}>
                <FormItem validateStatus={emailInputErr.status} help={emailInputErr.message}>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            onChange={event => setEmail(event.target.value)}
                            onBlur={handleEmailInputBlur}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={event => setPassword(event.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FormButton type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </FormButton>
                        or
                        <FormButton type="danger" htmlType="submit" className="login-form-button" onClick={signIn}>
                            Continue with Google
                        </FormButton>
                    </div>
                </FormItem>
                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

export const WrappedSignInForm = Form.create()(SignInForm);
