const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const getController = require('./controllers/getController');
const postController = require('./controllers/postController');
const deleteController = require('./controllers/deleteController');
const patchController = require('./controllers/patchController')

const PORT = 8000
const HOST = 'localhost'

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith("/api/v1/task")) {
        const data = await fs.readFile(path.resolve('./data.json'), 'utf-8')
        if (req.method === 'GET') {
            getController(req, res, data)

        } else if (req.method === 'POST') {
            postController(req,res, data)

        } else if (req.method === 'DELETE') {
            deleteController(req, res, data)

        } else if (req.method === 'PATCH') {
            patchController(req, res, data)

        }
    } else {
        res.writeHead(503, "Bad request")
    }

    res.end();

})

server.listen(PORT, HOST);
console.log(`Server running http://${HOST}:${PORT}`);