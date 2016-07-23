'use strict';

const fs = require('fs');
const path = require('path');

const PROCEDURES_FILE = path.join(__dirname, './procedures.json');

var procedure = {
    id: Date.now(),
    name: 'Фото подмладяване',
    text: 'Фотоподмладяването е лечебна процедура, която се извършва за профилактика или...'
};

fs.readFile(PROCEDURES_FILE, function(err, data) {
    if(err) {
        throw err
    }
    var procedures = JSON.parse(data);
    procedures.push(procedure);
    fs.writeFile(PROCEDURES_FILE, JSON.stringify(procedures, null, 4), function(err) {
        if(err) {
            throw err;
        }
    });
});