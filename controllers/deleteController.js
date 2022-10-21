const fs = require('fs/promises');
const path = require('path');

const deleteController = (req, res, localData) => {
    const arrData = JSON.parse(localData)
    const id = parseInt(req.url.split("/").at(-1))

    fs.writeFile(
        path.resolve('./data.json'),
        JSON.stringify(
            arrData.filter(itm => itm.id != id)
        )
    )
    res.writeHead(200)
}

module.exports = deleteController