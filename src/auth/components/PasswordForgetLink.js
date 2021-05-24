import { Link } from 'react-router-dom';
import React from 'react';

import { PASSWORD_FORGET } from '../../core/routes/routes';

export const PasswordForgetLink = () => (
    <p>
        <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);
