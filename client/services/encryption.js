const md5 = require("md5");

class Encryption {

    static Encrypt(data){
        return md5(data);
    }
}

module.exports = Encryption;