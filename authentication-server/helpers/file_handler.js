const fs = require('fs');

class FileHandler{

    Write(path, ...data){
        for (const value of data) {
            fs.appendFileSync(path, value.toString() + '\n');
        }
    }

    Read(path){
        const fileData = fs.readFileSync(path);
        return fileData.toString().split('\n');
    }
}

module.exports = new FileHandler();