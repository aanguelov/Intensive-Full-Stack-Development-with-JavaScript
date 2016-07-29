'use strict';

import React from 'react';
import $ from 'jquery';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { user: {} };
        this.getUser = this.getUser.bind(this);
    }

    getUser(userId) {
        $.ajax({
            method: 'GET',
            url: this.props.route.url + '/' + userId,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ user: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        this.getUser(this.props.params.userId);
    }

    render() {
        return(
            <div className="jumbotron container col-md-8 col-md-offset-2">
                <h3 className="username-greeting">Здравей {this.state.user.username}</h3>
            </div>
        )
    }
}

User.propTypes = {
    route: React.PropTypes.object,
    params: React.PropTypes.object
};

export default User;