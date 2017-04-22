import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './router';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
let port = 4000;

app.use( morgan('dev') );
app.use( bodyParser.json() );

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

app.use( session({
    secret: 'Memo$1234$',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', api);

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(
        port, () => console.log('Server is running on Port: ', port)
    );