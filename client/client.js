const file = require("./services/file");
const httpHandler = require('./services/handler');
const encryption = require('./services/encryption');

class Client {

    static async Start(){
        const userData = file.Read("in/integrity.txt");

        switch (userData[0]) {
            case 'FIRMAR':
                const key = await httpHandler.Post("http://proxy-server:8081/sign",{
                    username: userData[1],
                    messagetext: userData[2],
                });
                const messageHash = encryption.Encrypt(userData[2]);
                const signature = encryption.Encrypt(messageHash + key);
                file.Write("out/sign.txt",key,signature);
                break;
            case 'AUTENTICAR':

                break;
            case 'INTEGRIDAD':
                const signatureB1 = encryption.Encrypt(encryption.Encrypt(userData[2]) + userData[1]);
                const signatureB2 = userData[3];
                
                if (signatureB1 == signatureB2) {
                    file.Write("out/integrity.txt",'INTEGRO');
                } else {
                    file.Write("out/integrity.txt",'NO INTEGRO');
                }

                break;
        }
    }


}

console.log("CLIENTE INICIANDO.......")
setTimeout(()=>{
    Client.Start();
},10000);