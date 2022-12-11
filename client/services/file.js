const fs = require('fs');

class File {

    static Read(path){
        const fileData = fs.readFileSync(path);
        return fileData.toString().split('\r\n');
    }
}

module.exports = File;
