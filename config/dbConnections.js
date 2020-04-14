var mysql = require('mysql');

var connMysql = function () {
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '032126',
        database: 'portal_noticias'
    });
}

module.exports = function() {
    return connMysql;
}