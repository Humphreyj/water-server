const express  = require('express');
const PORT = process.env.PORT || 5000
const morgan = require("morgan");
const app = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('./db/dbConfig');
const passport = require('passport');


require("./passport/passport-local")(passport);

const whitelist = [
	"http://localhost:3000",
	"http://localhost:3001",
	process.env.CLIENT_URL,
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
app.use(passport.initialize());
const sessionConfig = {
	resave: false,
	saveUnintialized: false,
    name: "Dot",
    secret: 'Dot is great',
    cookie: {
        maxAge: 1000 * 1200,
        secure: false,
        httpOnly: true
    },
    
	store: new KnexSessionStore({
		knex: db,
		createtable: true
	})
}
app.use(morgan('dev'));
app.use(session(sessionConfig))

app.use(express.json());

//Routes
app.use('/api', require('./routes/router-index'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


module.exports = app;