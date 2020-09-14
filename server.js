const express  = require('express');
require("dotenv").config();
const morgan = require("morgan");
const app = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('./db/dbConfig');
const passport = require('passport');
const cp = require('cookie-parser');




const whitelist = [
	"http://localhost:3000",
	"http://localhost:3001",
	"https://zealous-spence-ca4b05.netlify.app",
];
app.use(require('cors')({
	preflightContinue: true,
	credentials: true,
	origin: function(origin, cb){
		if (whitelist.includes(origin) || !origin) {
			return cb(null, true)
		} else {
			console.log('is it having an error?')
			return cb(new Error('Not allowed by CORS'))
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

const sessionConfig = {

    name: "Dot",
    secret: 'Dot is great',
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
app.use(cp())
app.use(morgan('dev'));
app.use(session(sessionConfig))

app.use(express.json());

//Routes
app.use('/api', require('./routes/router-index'))




module.exports = app;