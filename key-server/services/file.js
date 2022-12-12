const fs = require('fs');

class File {

    static Write(path, ...data){
        for (const value of data) {
            fs.appendFileSync(path, value.toString() + '\n');
        }
    }
}

module.exports = File;
