'use strict';

import $ from './helpers/jquery-global.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainView from './componnents/views/main-view.jsx';
import Home from './componnents/views/parts/home.jsx';
import ProcedureView from './componnents/views/procedure-view.jsx';

window.jQuery = $;

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" url="/api/procedures" pollInterval={2000} component={MainView}>
            <IndexRoute component={Home} />
            <Route path="/procedures(/:procedureId)" url="/api/procedures" component={ProcedureView} />
        </Route>
    </Router>
), document.getElementById('main-container'));