'use strict';

import React from 'react';
import $ from 'jquery';

class LoginUser extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {username: '', password: ''};
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    loginUser() {
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        $.ajax({
            method: 'POST',
            url: this.props.route.url,
            dataType: 'json',
            data: user
        }).done((user) => {
            let path = '/users/' + user.id;
            this.context.router.push(path);
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err);
        });
    }

    render() {
        return(
            <div className="jumbotron container col-xs-12 col-md-6 col-lg-4 col-md-offset-4">
                <div className="form-group">
                    <label htmlFor="username">Потребителско име</label>
                    <input type="text" className="form-control" id="username" onChange={this.handleUsername} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Парола</label>
                    <input type="password" className="form-control" id="password" onChange={this.handlePassword} />
                </div>
                <button className="btn btn-primary" onClick={this.loginUser}>Логни се</button>
            </div>
        )
    }
}

LoginUser.propTypes = {
    route: React.PropTypes.object
};

LoginUser.contextTypes = {
    router: React.PropTypes.object
};

export default LoginUser;