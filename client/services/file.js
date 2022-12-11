const fs = require('fs');

class File {

    static Read(path){
        const fileData = fs.readFileSync(path);
        return fileData.toString().split('\r\n');
    }

    static Write(path, ...data){
        this.Clear(path);
        for (const value of data) {
            fs.appendFileSync(path, value.toString() + '\n');
        }
    }

    static Clear(path){
        fs.writeFileSync(path,'');
    }

}

module.exports = File;
