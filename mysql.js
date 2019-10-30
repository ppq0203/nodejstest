const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'mysql',
    database : 'test'
});

connection.connect((err) => {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields)=>{
    if(err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

connection.end();