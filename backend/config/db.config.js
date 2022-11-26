const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL)
    .then(() => console.log('Database Connected'))
    .catch((error) => console.log('Database error: ', error));