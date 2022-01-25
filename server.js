const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware, *i'm not sure what this is?*

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//connect the application to the MySQL database *is it important the location of this code?*
const db = mysql.createConnection(
    {
        host: 'localhost',
        //My MySQL username,
        user: 'root',
        //My MySQL password
        password: 'Iamenough2022@',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// //GET - return all data from candidates table 
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

//GET a single candidate 
db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

//Delete a candidate 
db.query(`DELETE FROM candidates WHERE id = ? `, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

//Adding a candidate back to the table 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});


//Handle user requests that aren't supported by the app 
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
