'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const procedureRoutes = require('./procedures-api/procedure.routes.js');
const userRoutes = require('./users-api/user.routes.js');
const allRoutes = procedureRoutes.concat(userRoutes);

const server = new Hapi.Server();
server.connection({ port: 9000 });


// Registering the Good plugin
server.register([{
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    error: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}], (err) => {
    if (err) {
        throw err;
    }

    // Starting the server
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

server.route(allRoutes);