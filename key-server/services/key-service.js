const file = require("./file");
const generator = require("./generator");

class KeyService {

    GenerateKey(userData){
        const key = generator.Generate(10000000,99999999);
        file.Write('db/datos.txt',key,userData.username);
        return key;
    }

}

module.exports = new KeyService();