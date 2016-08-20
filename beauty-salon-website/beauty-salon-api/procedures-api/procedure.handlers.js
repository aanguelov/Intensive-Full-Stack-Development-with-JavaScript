'use strict';

const fs = require('fs');
var path = require('path');

const PROCEDURES_FILE = path.join(__dirname, '../../procedures.json');

exports.getAllProcedures = function(request, reply) {
    fs.readFile(PROCEDURES_FILE, function(err, data) {
        if(err) {
            throw err;
        }

        reply(JSON.parse(data));
    })
};

exports.getProcedure = function(request, reply) {
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
};

exports.addProcedure = function(request, reply) {
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
};

exports.deleteProcedure = function(request, reply) {
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
};

exports.editProcedure = function(request, reply) {
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
};