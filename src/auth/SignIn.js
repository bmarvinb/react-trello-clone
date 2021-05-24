import React from 'react';

import { FormContainer } from './components/FormContainer';
import { PasswordForgetLink } from './components/PasswordForgetLink';
import { SignUpLink } from './components/SignUpLink';
import { WrappedSignInForm } from './components/SignInForm';

export const SignInScreen = ({ history }) => (
    <FormContainer>
        <WrappedSignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
    </FormContainer>
);
