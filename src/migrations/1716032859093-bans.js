'use strict';
const database = new (require('../database/mysqlSevice'))();

exports.up = function(next) {
    database.connection.query(`
        CREATE TABLE bans (
            id         INT AUTO_INCREMENT PRIMARY KEY,
            user_name  VARCHAR(255) NOT NULL,
            user_id    VARCHAR(255) NOT NULL,
            admin_name VARCHAR(255) NOT NULL,
            admin_id   VARCHAR(255) NOT NULL,
            reason    VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_unban   bool DEFAULT false
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
