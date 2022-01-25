const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware, i'm not sure what this is?

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//connect the application to the MySQL database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your MySQL username,
        user: 'root',
        //Your MySQL password
        password: 'Iamenough2022@',
        database: 'election'
    },
    console.log('Connected to the election database.')
)

//Handle user requests that aren't supported by the app 
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
