import { Form, Icon, Input } from 'antd';
import React, { useState, Component } from 'react';

import { BOARDS } from '../../core/routes/routes';
import { byPropKey } from '../../utils';
import { doSignInWithEmailAndPassword } from '../api/auth';
import { ErrorMessage } from './ErrorMessage';
import { FormButton } from './FormButton';
import { FormContainer } from './FormContainer';
import { useStateValue } from '../redux/StateProvider';
import { actionTypes } from '../redux/reducer';
import { auth, provider } from '../../core/api/firebase';
import { useHistory } from 'react-router';

const SignInForm = ({ history, form }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const FormItem = Form.Item;

    const onSubmit = async event => {
        event.preventDefault();
        const submitButton = document.querySelector('.login-form-button');
        submitButton.disabled = true;

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

    const [{}, dispatch] = useStateValue();
    // const history = useHistory();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result.user);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                history.push(BOARDS);
            })
            .catch(error => alert(error.message));
    };

    const { getFieldDecorator } = form;

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={onSubmit}>
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
