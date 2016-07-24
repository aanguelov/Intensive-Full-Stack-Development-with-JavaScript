'use strict';

const fs = require('fs');
var path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const PROCEDURES_FILE = path.join(__dirname, '../procedures.json');

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

server.route([
    {
        method: 'GET',
        path: '/api/procedures',
        handler: function(request, reply) {
            fs.readFile(PROCEDURES_FILE, function(err, data) {
                if(err) {
                    throw err;
                }

                reply(JSON.parse(data));
            })
        }
    }
]);