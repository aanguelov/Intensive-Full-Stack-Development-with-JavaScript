'use strict';

import $ from './helpers/jquery-global.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainView from './componnents/views/main-view.jsx';
import Home from './componnents/views/parts/home.jsx';
import Procedure from './componnents/views/procedures/procedure.jsx';
import AddProcedure from './componnents/views/procedures/add-procedure.jsx';
import EditProcedure from './componnents/views/procedures/edit-procedure.jsx';
import RegisterUser from './componnents/views/users/register-user.jsx';
import LoginUser from './componnents/views/users/login-user.jsx';
import User from './componnents/views/users/user.jsx';

window.jQuery = $;

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" url="/api/procedures" pollInterval={2000} component={MainView}>
            <IndexRoute component={Home} />
            <Route path="/procedures/add" url="/api/procedures" component={AddProcedure} />
            <Route path="/procedures/edit(/:procedureId)" url="/api/procedures" component={EditProcedure} />
            <Route path="/procedures(/:procedureId)" url="/api/procedures" component={Procedure} />
            <Route path="/users/register" url="/api/users" component={RegisterUser} />
            <Route path="/users/login" url="/api/users/Token" component={LoginUser} />
            <Route path="/users(/:userId)" url="/api/users" component={User} />
        </Route>
    </Router>
), document.getElementById('main-container'));