const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware, i'm not sure what this is?

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Handle user requests that aren't supported by the app 
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
