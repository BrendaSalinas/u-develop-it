const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

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

// //GET - return all data from candidates table using a express route
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


//GET a single candidate using a express route 
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err,row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message:'success',
            data:row
        })
    });
});

//DELETE a candidate using the express server and MySQL
app.delete('/api/candidate/:id', (req,res) => {
    const sql = `DELETE FROM candidates WHERE id = ? `;
    const params = [req.params.id];

    db.query(sql,params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) { //What is affectedRows
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

//POST - create a candidate using express *What does the body part do? *
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    //Adding a candidate back to the table using MySQL
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


//Adding a candidate back to the table 



//Handle user requests that aren't supported by the app 
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
