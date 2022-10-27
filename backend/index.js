require('dotenv').config();
require('./config/db.config');

const express = require('express');


const PORT = process.env.PORT;



const app = express();
app.use(express.json({limit: '5mb'}));



app.listen(PORT, () => console.log('Start Server'));