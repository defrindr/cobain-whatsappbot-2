var mysql = require('mysql');
const util = require('util');
export const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_botlelang'
});

// node native promisify
export const query = util.promisify(conn.query).bind(conn);