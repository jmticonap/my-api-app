const fs = require('fs/promises');
const path = require('path');

const task_template = {
    id:0,
    title: 'Title #',
    description: 'Description of the task#',
    isDone: false
}

const postController = (req, res, localData) => {
    const arrData = JSON.parse(localData)

    req.on("data", newData => {
        console.log("DATA TYPE", typeof(newData))
        const newRow = {
            ...task_template,
            id: arrData[arrData.length-1]['id']+1,
            ...JSON.parse(newData)
        }
        arrData.push(newRow)
        fs.writeFile(path.resolve('./data.json'), JSON.stringify(arrData))
        res.writeHead(201)
    });

}

module.exports = postController