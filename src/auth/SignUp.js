import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { BOARDS } from '../core/routes/routes';
import { doCreateUser } from '../core/api/db';
import { doCreateUserWithEmailAndPassword } from './api/auth';
import WrappedSignUpForm from './components/SignUpForm';

class SignUpScreen extends Component {
    async onSubmit(email, password, username) {
        return doCreateUserWithEmailAndPassword(email, password).then(authUser => {
            doCreateUser(authUser.user.uid, username, email);
            window.history.push(BOARDS);
        });
    }

    render() {
        return <WrappedSignUpForm onSubmit={this.onSubmit} />;
    }
}

export const WrappedSignUpScreen = withRouter(SignUpScreen);
