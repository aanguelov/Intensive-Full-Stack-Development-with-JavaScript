'use strict';

const fs = require('fs');
var path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const PROCEDURES_FILE = path.join(__dirname, '../procedures.json');
const USERS_FILE = path.join(__dirname, '../users.json');

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
    },
    {
        method: 'GET',
        path: '/api/procedures/{id}',
        handler: function(request, reply) {
            fs.readFile(PROCEDURES_FILE, function(err, data) {
                if(err) {
                    throw err;
                }

                let procedures = JSON.parse(data);
                let procedureToFind = {};
                procedures.forEach((procedure) => {
                    if(procedure.id === parseInt(request.params.id)) {
                        procedureToFind = procedure;
                    }
                });

                reply(procedureToFind);
            })
        }
    },
    {
        method: 'POST',
        path: '/api/procedures',
        handler: function(request, reply) {
            fs.readFile(PROCEDURES_FILE, function(err, data) {
                if(err) {
                    throw err;
                }

                let procedures = JSON.parse(data);
                let newProcedure = {
                    id: Date.now(),
                    name: request.payload.name,
                    text: request.payload.text
                };
                procedures.push(newProcedure);

                fs.writeFile(PROCEDURES_FILE, JSON.stringify(procedures, null, 4), function(err) {
                    if(err) {
                        throw err;
                    }
                    reply(newProcedure.id);
                })
            })
        }
    },
    {
        method: 'DELETE',
        path: '/api/procedures/{id}',
        handler: function(request, reply) {
            fs.readFile(PROCEDURES_FILE, function(err, data) {
                if(err) {
                    throw err;
                }

                let procedures = JSON.parse(data);
                procedures = procedures.filter((procedure) => {
                    return procedure.id !== parseInt(request.params.id);
                });

                fs.writeFile(PROCEDURES_FILE, JSON.stringify(procedures, null, 4), function(err) {
                    if(err) {
                        throw err;
                    }
                    reply(request.params.id);
                })
            })
        }
    },
    {
        method: 'PUT',
        path: '/api/procedures',
        handler: function(request, reply) {
            fs.readFile(PROCEDURES_FILE, function(err, data) {
                if(err) {
                    throw err;
                }

                let procedures = JSON.parse(data);
                let newProcedure = request.payload;
                newProcedure.id = parseInt(newProcedure.id);

                procedures = procedures.filter((procedure) => {
                    return procedure.id !== newProcedure.id;
                });

                procedures.push(newProcedure);

                fs.writeFile(PROCEDURES_FILE, JSON.stringify(procedures, null, 4), function(err) {
                    if(err) {
                        throw err;
                    }
                    reply(newProcedure.id);
                })
            })
        }
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: function(request, reply) {
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
        }
    },
    {
        method: 'POST',
        path: '/api/users/Token',
        handler: function(request, reply) {
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
        }
    },
    {
        method: 'GET',
        path: '/api/users/{id}',
        handler: function(request, reply) {
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
        }
    }
]);