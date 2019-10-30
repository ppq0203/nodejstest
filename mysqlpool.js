const mysql = require('mysql');
const connection = mysql.createPool({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'mysql',
    database : 'test',
    connectionLimit: 2
});

for (let i = 0; i< 6; i++){
    connection.getConnection((err, connection)=>{
        if(err){
            console.log("ERROR:", err);
            return;
        }

        connection.query('SELECT something FROM sometable', (err, rows)=>{
            console.log(new Date());

            setTimeout(()=>{
                connection.release();
            },3000);
        });
    });
}