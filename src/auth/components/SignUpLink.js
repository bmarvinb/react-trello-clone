import { Link } from 'react-router-dom';
import React from 'react';

import { SIGN_UP } from '../../core/routes/routes';

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
    </p>
);
