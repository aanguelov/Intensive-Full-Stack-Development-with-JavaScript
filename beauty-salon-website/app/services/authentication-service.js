'use strict';

import $ from 'jquery';

class AuthenticationService {
    constructor(base_url) {
        this.url = base_url;
    }

    loginUser(user) {
        let url = this.url + '/Token';
        let userData = {};
        let deferred = $.Deferred();

        $.ajax({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: user
        }).then((loggedUser) => {
            userData.isAdmin = loggedUser.isAdmin;
            userData.id = loggedUser.id;
            sessionStorage.currentUser = JSON.stringify(userData);
            deferred.resolve(loggedUser);
        }, (err) => {
            deferred.reject(err);
        });

        return deferred.promise();
    }

    getUserById(id) {
        let url = this.url + '/' + id;
        let deferred = $.Deferred();

        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
            cache: false
        }).then((user) => {
            deferred.resolve(user);
        }, (err) => {
            deferred.reject(err);
        });

        return deferred.promise();
    }

    logoutUser() {
        sessionStorage.clear();
    }

    getUser() {
        let userObject = sessionStorage.currentUser;
        if (userObject) {
            return JSON.parse(sessionStorage.currentUser);
        }
    }

    isAuthenticated() {
        return sessionStorage.currentUser !== undefined;
    }

    isAdmin() {
        //let currentUser = this.getUser();
        //return currentUser !== undefined && currentUser.isAdmin;

        let userObject = sessionStorage.currentUser;
        if (userObject) {
            return JSON.parse(userObject).isAdmin;
        }else {
            return false;
        }
    }
}

export default AuthenticationService;