const fs = require('fs');

//metodos helpers para manejo de archivos
class File {

    //metodo de lectura
    static Read(path){
        const fileData = fs.readFileSync(path);
        return fileData.toString().split('\r\n');
    }
    //metodo de escritura
    static Write(path, ...data){
        this.Clear(path);
        for (const value of data) {
            fs.appendFileSync(path, value.toString() + '\n');
        }
    }

    //metodo de limpiado
    static Clear(path){
        fs.writeFileSync(path,'');
    }

}

module.exports = File;
