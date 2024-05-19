const mysql      = require('mysql2');
const config = require('../config/database');
const commonConfig = require('../config/common.json');
const {NULL} = require("mysql/lib/protocol/constants/types");

module.exports = class Database
{
    //property
    connectName = ''
    connection = NULL

    constructor(connectName = commonConfig.defaultConnectName, createConnect = true) {
        this.connectName = connectName;
        if (createConnect) this.createConnect()
    }

    createConnect(){
        const connectionConfig = config[this.connectName];

        if (!connectionConfig) {
            throw new Error(`Connection configuration for ${this.connectName} not found`);
        }
        console.log(connectionConfig)
         this.connection = mysql.createConnection({
            host     : connectionConfig.host,
            user     : connectionConfig.user,
            password : connectionConfig.password,
            database : connectionConfig.database
        });

        this.connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log(`connected`);
        });
       return this
    }
    banUser(user_name, user_id, admin_name, admin_id, reason){

        this.connection.query(`
            INSERT INTO
                bans (user_name, user_id, admin_name, admin_id, reason)
            VALUES
                (?, ?, ?, ?, ?);
        `, [user_name, user_id, admin_name, admin_id, reason]);

    }
    getConnection(){
        return this.connection
    }

}