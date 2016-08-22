'use strict';

import React from 'react';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { user: {} };
        this.isAuthenticated = props.isAuthenticated;
        this.isAdmin = props.isAdmin;
        this.getUser = this.getUser.bind(this);
        this.handleUserLogout = this.handleUserLogout.bind(this);
    }

    getUser(id) {
        this.context.authService.getUserById(id).then((user) => {
            this.setState({user: user});
        })
    }

    handleUserLogout() {
        this.props.logoutUser();
        this.context.router.push('/');
    }

    componentDidMount() {
        let currentUser = this.props.getCurrentUser();
        this.getUser(currentUser.id);
    }

    render() {
        return(
            <div className="jumbotron container col-md-8 col-md-offset-2">
                <h3 className="username-greeting">Здравей {this.state.user.username}</h3>
                <button className="btn btn-primary" onClick={this.handleUserLogout}>Излез</button>
                {
                    this.isAdmin ?
                        <button className="btn btn-info">Всички потребители</button>
                    : null

                }
            </div>
        )
    }
}

User.propTypes = {
    //route: React.PropTypes.object,
    params: React.PropTypes.object,
    isAdmin: React.PropTypes.func,
    isAuthenticated: React.PropTypes.func,
    getCurrentUser: React.PropTypes.func,
    logoutUser: React.PropTypes.func
};

User.contextTypes = {
    router: React.PropTypes.object,
    authService: React.PropTypes.object
};

export default User;