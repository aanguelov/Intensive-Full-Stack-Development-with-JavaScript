'use strict';

import React from 'react';
import Navigation from './parts/navigation';
import AuthenticationService from '../.././services/authentication-service';
import $ from 'jquery';

class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: []};
        this.authenticationService = new AuthenticationService('/api/users');
        this.loadProcedures = this.loadProcedures.bind(this);
    }

    getChildContext() {
        return {
            authService: this.authenticationService
        };
    }

    loadProcedures() {
        $.ajax({
            method: 'GET',
            url: this.props.route.url,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ data: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        this.loadProcedures();
        setInterval(this.loadProcedures, this.props.route.pollInterval);
    }

    render() {
        return (
        <div>
            <Navigation
                data={this.state.data}
                isAuthenticated={this.authenticationService.isAuthenticated}
                isAdmin={this.authenticationService.isAdmin}
            />

            {/* Routed components go here... */}
            {this.props.children}
        </div>);
    }
}

MainView.propTypes = {
    children: React.PropTypes.node,
    url: React.PropTypes.string,
    pollInterval: React.PropTypes.number,
    route: React.PropTypes.object
};

MainView.childContextTypes = {
    authService: React.PropTypes.object
};

export default MainView;