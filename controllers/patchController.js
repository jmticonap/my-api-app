const fs = require('fs/promises');
const path = require('path');

const patchController = (req, res, localData) => {
    console.log("UPDATING...")
    const arrData = JSON.parse(localData)
    const id = parseInt(req.url.split("/").at(-1))

    req.on("data", newData => {
        fs.writeFile(
            path.resolve('./data.json'),
            JSON.stringify(arrData.map(itm => (
                {
                    ...itm,
                    ...(itm.id == id && JSON.parse(newData))
                }
            )))
        )
        res.writeHead(200)
    });
}

module.exports = patchController