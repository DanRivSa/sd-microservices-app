const file = require("./services/file");
const httpHandler = require('./services/handler');
const encryption = require('./services/encryption');

class Client {

    static async Start(){

        console.clear();
        console.log("SISTEMA DE OPERACIONES - PROYECTO DE DISTRIBUIDOS POR DANIEL RIVERO Y JOSE FLORES \n\n");
        console.log("En el sistema se pueden ejecutar las siguientes operaciones: \n");
        console.log("1- FIRMAR \n");
        console.log("2- AUTENTICAR\n");
        console.log("3- INTEGRIDAD\n\n");
        console.log("El sistema buscará leer un archivo en la carpeta 'in', llamado input.txt, el cual detectará la operación a realizar y los datos provistos en el archivo.\n\n");
        console.log("LEYENDO ARCHIVO input.txt ...\n");
        let userData;
        try{
            userData = file.Read("in/input.txt");
        }catch(err){
            console.clear();
            throw new Error('Hubo un error al leer el archivo "input.txt", por favor verifique la existencia del mismo en la carpeta "in" en la raiz del proyecto. y vuelva a ejecutar');
        }

        let op = userData[0];

        switch (op) {
            case 'FIRMAR': //FIRMAR
                const key = await httpHandler.Post("http://proxy-server:8081/sign",{
                    username: userData[1],
                    messagetext: userData[2],
                });
                const messageHash = encryption.Encrypt(userData[2]);
                const signature = encryption.Encrypt(messageHash + key);
                file.Write("out/sign.txt",key,signature);
                break;
            case 'AUTENTICAR': //'AUTENTICAR'

                break;
            case 'INTEGRIDAD': //'INTEGRIDAD'
                userData = file.Read("in/integrity.txt");
                const signatureB1 = encryption.Encrypt(encryption.Encrypt(userData[2]) + userData[1]);
                const signatureB2 = userData[3];
                
                if (signatureB1 == signatureB2) {
                    file.Write("out/integrity.txt",'INTEGRO');
                } else {
                    file.Write("out/integrity.txt",'NO INTEGRO');
                }

                break;
            default:
                break;
        }

    }


}

Client.Start();
