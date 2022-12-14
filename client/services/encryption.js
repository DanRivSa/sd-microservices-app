const md5 = require("md5");

//servicio de encripcion con md5
class Encryption {

    static Encrypt(data){
        return md5(data);
    }
}

module.exports = Encryption;