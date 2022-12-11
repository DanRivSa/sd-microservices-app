const file = require("./services/file");
const httpHandler = require('./services/handler');

class Client {

    static async Start(){
        const userData = file.Read("in/entrada.txt");

        switch (userData[0]) {
            case 'FIRMAR':
                const key = await httpHandler.Post("http://web-server:8081/sign",{
                    username: userData[1],
                    messagetext: userData[2],
                })
                break;
            case 'AUTENTICAR':
                
                break;
            default:
                break;
        }
    }


}

Client.Start();