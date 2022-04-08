// load up the web server
const server = require('./app')

// the port to listen to for incoming requests
const port = process.env.PORT || 4000

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
    listener.close()
}

module.exports = {
    close: close,
}