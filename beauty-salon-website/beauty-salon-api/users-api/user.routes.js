'use strict';

const Users = require('./user.handlers.js');

module.exports = [
    {
        method: 'GET',
        path: '/api/users/{id}',
        handler: Users.getUser
    },
    {
        method: 'POST',
        path: '/api/users/Token',
        handler: Users.login
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: Users.register
    }
];