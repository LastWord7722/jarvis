'use strict';
const Database = require('../database/mysqlSevice');
const database = new Database();

exports.up = function(next) {
    database.connection.query(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, function(error, results, fields) {
        if (error) {
            return next(error);
        }
        next();
    });
};

exports.down = function(next) {
    database.getConnection().query(`
        DROP TABLE users
    `, function(error, results, fields) {
        if (error) {
            return next(error);
        }
        next();
    });
};
