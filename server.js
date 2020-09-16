const express  = require('express');
require("dotenv").config();
const morgan = require("morgan");
const app = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('./db/dbConfig');
const cp = require('cookie-parser');





app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	next();
  });
app.use(require('cors')({
	preflightContinue: true,
	credentials: true,
	origin: [
        "http://localhost:3000",
        "http://localhost:3001",
		process.env.CLIENT_URL,
		"https://zealous-spence-ca4b05.netlify.app/"
	],
	allowedHeaders: ["Origin",'Content-Type', 'Authorization'],
	methods:['GET', 'PUT', 'POST','DELETE','OPTIONS']
}))

const sessionConfig = {

    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 1200,
        secure: false,
        httpOnly: false
	},
	resave: false,
	saveUninitialized: false,
    
	store: new KnexSessionStore({
		knex: db,
		createtable: true
	})
}
app.use(session(sessionConfig))
app.use(cp(process.env.SESSION_SECRET))
app.use(morgan('dev'));


app.use(express.json());

//Routes
app.use('/api', require('./routes/router-index'))




module.exports = app;