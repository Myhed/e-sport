const mysql = require('promise-mysql');

const pool = mysql.createPool({
    host:'localhost',
    user:'myhed',
    password: process.env.PORT || 'myhedroot',
    database:'esport',
    connectionLimit: 10
})

module.exports = pool;