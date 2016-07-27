'use strict';

import $ from './helpers/jquery-global.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainView from './componnents/views/main-view.jsx';
import Home from './componnents/views/parts/home.jsx';
import Procedure from './componnents/views/parts/procedure.jsx';
import AddProcedure from './componnents/views/parts/add-procedure.jsx';

window.jQuery = $;

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" url="/api/procedures" pollInterval={2000} component={MainView}>
            <IndexRoute component={Home} />
            <Route path="/procedures/add" url="/api/procedures" component={AddProcedure} />
            <Route path="/procedures(/:procedureId)" url="/api/procedures" component={Procedure} />
        </Route>
    </Router>
), document.getElementById('main-container'));