import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { ACCOUNT, BOARD, BOARDS, LANDING, PASSWORD_FORGET, SIGN_IN, SIGN_UP } from './routes';
import { Navigation } from '../../navigation/Navigation';
import { NotFoundScreen } from '../../screens/NotFound/NotFound';
import PasswordForgetScreen from '../../auth/PasswordForget';
import { SignInScreen } from '../../auth/SignIn';
import { withAuthentication } from '../../auth/utils/AuthHOC';
import { WrappedSignUpScreen } from '../../auth/SignUp';
import { WrapperAccountScreen } from '../../auth/Account';
import { WrapperBoardScreen } from '../../screens/Board/Board';
import { WrapperBoardsScreen } from '../../screens/Boards/Boards';

const Routes = () => (
    <Router>
        <React.Fragment>
            <Navigation />
            <Switch className="container">
                {<Route exact path={LANDING} render={() => <Redirect to={BOARDS} />} />}
                <Route exact path={SIGN_UP} component={WrappedSignUpScreen} />
                <Route exact path={SIGN_IN} component={SignInScreen} />
                <Route exact path={PASSWORD_FORGET} component={PasswordForgetScreen} />
                {<Route exact path={BOARDS} component={WrapperBoardsScreen} />}
                <Route exact path={ACCOUNT} component={WrapperAccountScreen} />
                <Route exact path={BOARD} component={WrapperBoardScreen} />
                <Route component={NotFoundScreen} />
            </Switch>
        </React.Fragment>
    </Router>
);

export default withAuthentication(Routes);
