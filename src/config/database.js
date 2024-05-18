require('dotenv').config();
const env = process.env

module.exports =
  {
    mysql:
      {
        user : env.MYSQL_USER,
        password : env.MYSQL_PASSWORD,
        host : env.MYSQL_HOST,
        database : env.MYSQL_DATABASE,
      }
  }
