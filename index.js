const server = require('./server');

const routes = require('./routes/router-index')
const PORT = process.env.PORT || 5000


server.use('/api', routes)

server.listen(PORT, () =>
			console.log(`Listening on port ${PORT}`)
)