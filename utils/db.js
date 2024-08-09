import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:"employees"
})

con.connect((err)=>{
    if(err) throw err;
    console.log("Connected to the database");
})

export default con