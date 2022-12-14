const fs = require('fs');

//clase para  manejo de archivos
class File {

    static Write(path, ...data){
        for (const value of data) {
            fs.appendFileSync(path, value.toString() + '\n');
        }
    }
}

module.exports = File;
