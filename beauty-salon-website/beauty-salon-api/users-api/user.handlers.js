'use strict';

const fs = require('fs');
var path = require('path');

const USERS_FILE = path.join(__dirname, '../../users.json');

exports.register = function(request, reply) {
    fs.readFile(USERS_FILE, function(err, data) {
        if(err) {
            throw err;
        }

        let users = JSON.parse(data);
        let newUser = {
            id: Date.now(),
            username: request.payload.username,
            password: request.payload.password,
            confirmPassword: request.payload.confirmPassword,
            isAdmin: false
        };
        users.push(newUser);

        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
            if(err) {
                throw err;
            }
            reply(newUser);
        })
    })
};

exports.login = function(request, reply) {
    fs.readFile(USERS_FILE, function(err, data) {
        if(err) {
            throw err;
        }

        let users = JSON.parse(data);
        let currentUser = request.payload;

        users.forEach((user) => {
            if(currentUser.username === user.username && currentUser.password === user.password) {
                reply(user);
            }
        })
    })
};

exports.getUser = function(request, reply) {
    fs.readFile(USERS_FILE, function(err, data) {
        if(err) {
            throw err;
        }

        let users = JSON.parse(data);
        let userToFind = {};
        users.forEach((user) => {
            if(user.id === parseInt(request.params.id)) {
                userToFind = user;
            }
        });

        reply(userToFind);
    })
};