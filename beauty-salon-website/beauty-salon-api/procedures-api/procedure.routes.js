'use strict';

const Procedures = require('./procedure.handlers.js');

module.exports = [
    {
        method: 'GET',
        path: '/api/procedures',
        handler: Procedures.getAllProcedures
    },
    {
        method: 'GET',
        path: '/api/procedures/{id}',
        handler: Procedures.getProcedure
    },
    {
        method: 'POST',
        path: '/api/procedures',
        handler: Procedures.addProcedure
    },
    {
        method: 'DELETE',
        path: '/api/procedures/{id}',
        handler: Procedures.deleteProcedure
    },
    {
        method: 'PUT',
        path: '/api/procedures',
        handler: Procedures.editProcedure
    }
];