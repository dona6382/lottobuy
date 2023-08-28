const mysql = require('mysql');

exports.connection = mysql.createPool({
    connectionLimit: 40,
    waitForConnections: true,
    host: 'svc.sel3.cloudtype.app',
    user: 'hwi',
    password: 'hwi00!q',
    port: 32566,
    database: 'lotto',
    multipleStatements: true,
    timeout: 600000,
    acquireTimeout: 600000
});
