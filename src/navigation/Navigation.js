import React from 'react';

import AuthorizedNavigation from './AuthorizedNavigation';
import { AuthUserContext } from '../auth/utils/AuthUserContext';
import UnauthorizedNavigation from './UnauthorizedNavigation';

export const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => (authUser ? <AuthorizedNavigation /> : <UnauthorizedNavigation />)}
    </AuthUserContext.Consumer>
);
