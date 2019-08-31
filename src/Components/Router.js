import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';

const LoggedInRoutes = () => <><Route exact path="/" component={Feed} /></>
const LoggedOutRoutes = () => <><Route exact path="/" component={Auth} /></>

const AppRouter = ({isLoggedIn}) => (
    <Router>
        <Switch>
            {isLoggedIn? <LoggedInRoutes /> : <LoggedOutRoutes /> }
        </Switch>
    </Router>
)

export default AppRouter;

Router.PropTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}