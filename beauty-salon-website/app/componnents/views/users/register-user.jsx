'use strict';

import React from 'react';

class RegisterUser extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {username: '', password: '', confirmPassword: ''};
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handlePasswordConfirm(event) {
        this.setState({confirmPassword: event.target.value});
    }

    registerUser() {
        if(this.state.password !== this.state.confirmPassword) {
            console.log('Passwords do not match!');
            return;
        }

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(user);
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
                <div className="form-group">
                    <label htmlFor="password-confirm">Потвърди паролата</label>
                    <input type="password" className="form-control" id="password-confirm" onChange={this.handlePasswordConfirm} />
                </div>
                <button className="btn btn-primary" onClick={this.registerUser}>Регистрирай се</button>
            </div>
        )
    }
}

export default RegisterUser;