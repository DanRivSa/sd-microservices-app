const file = require("./services/file");
const httpHandler = require('./services/handler');
const encryption = require('./services/encryption');

class Client {

    static async Start(){
        const userData = file.Read("in/entrada.txt");

        switch (userData[0]) {
            case 'FIRMAR':
                const key = await httpHandler.Post("http://web-server:8081/sign",{
                    username: userData[1],
                    messagetext: userData[2],
                });
                const messageHash = encryption.Encrypt(userData[2]);
                const signature = encryption.Encrypt(messageHash + key);
                file.Write("out/salida.txt",key,signature);
                break;
            case 'AUTENTICAR':
                
                break;
            default:
                break;
        }
    }


}

setTimeout(()=>{
    Client.Start();
},5000);