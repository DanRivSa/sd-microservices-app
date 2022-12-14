const fs = require('fs');

//helper para manejo de archivos
class FileHandler{

    //Metodo para leer en archivo
    Read(path){
        const fileData = fs.readFileSync(path);
        //devuelve array de strings separado por saltos de linea
        return fileData.toString().split('\n');
    }
}

module.exports = new FileHandler();