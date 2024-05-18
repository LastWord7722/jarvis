'use strict';
const database = new (require('../database/mysqlSevice'))();

exports.up = function(next) {
    database.connection.query(`
        CREATE TABLE bans (
            id         INT AUTO_INCREMENT PRIMARY KEY,
            user_hash  VARCHAR(255) NOT NULL,
            admin_hash VARCHAR(255) NOT NULL,
            message    VARCHAR(255) NOT NULL,
            start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            end_date   TIMESTAMP
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
        DROP TABLE bans
    `, function(error, results, fields) {
        if (error) {
            return next(error);
        }
        next();
    });
};
