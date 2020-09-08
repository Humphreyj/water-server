const server = require('./server');
require("dotenv").config();
const routes = require('./routes/router-index')
const PORT = process.env.PORT || 5000


server.use('/api', routes)

server.get("/", (req, res) => {
	res.send(`
		<h1>This is a test!</h1>
	`);
});

server.listen(PORT, () =>
			console.log(`Listening on port ${PORT}`)
)