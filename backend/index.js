require('dotenv').config();
require('./config/db.config');
const users = require('./routes/user.routes');
const photos = require('./routes/photo.routes');
const express = require('express');
const userAuthMiddleware = require('./middlewares/user.middleware');

const PORT = process.env.PORT;



const app = express();
app.use(express.json({limit: '5mb'}));

//users main route
app.use('/users', userAuthMiddleware, users);

//photos main route
app.use('/photos', userAuthMiddleware, photos);


app.listen(PORT, () => console.log('Start Server'));