require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');


const app = express();
app.use(cors());
app.use(express.json());    
const PORT= process.env.PORT || 5000;
const MYSQL_USERNAME=process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD=process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE=process.env.MYSQL_DATABASE;
const MYSQL_HOST=process.env.MYSQL_HOST || 'localhost';
const MYSQL_PORT=process.env.MYSQL_PORT || 3306;
const db = mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
});
const MONGOOSE_URL=process.env.MONGOOSE_URL || 'mongodb://localhost:27017/mydatabase';


app.get('/', (req, res) => {
    res.send('<h1>Backend</h1><p>running</p>');
});
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!',timestamp: new Date() });
});
app.get('/api/browse', (req, res) => {
    const tb=req.query.tb || 'customer';
    var cond='';
    if( req.query.customer) {
        cond=' and customer='+req.query.customer;
    }
    db.query('SELECT * FROM '+tb+' where 1 '+cond, (error, results) => {    
        if (error) {
            console.error('Error fetching '+tb+':', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

app.get('/api/customers', (req, res) => {
    db.query('SELECT * FROM customer', (error, results) => {    
        if (error) {
            console.error('Error fetching customers:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});