require('dotenv').config();
require('./config/db.config');

const users = require('./routes/user.routes');
const photos = require('./routes/photo.routes');
const auth = require('./routes/auth.routes');

const express = require('express');
const userAuthMiddleware = require('./middlewares/user.middleware');


const PORT = process.env.PORT;


const app = express();
app.use(express.json({limit: '15mb'}));


//users main route
app.use('/users', userAuthMiddleware, users);


//photos main route
app.use('/photos', userAuthMiddleware, photos);


// accounts settings(login, signup, change password...)
app.use('/', auth);

app.listen(PORT, (err) => {
    if(err)
        console.log(err);
    else
        console.log('Start Server');
});