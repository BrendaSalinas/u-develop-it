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

//Delete a candidate using the express server and MySQL
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


//Adding a candidate back to the table 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });


//Handle user requests that aren't supported by the app 
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
