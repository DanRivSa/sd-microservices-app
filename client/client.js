const file = require("./services/file");
const httpHandler = require('./services/handler');
const encryption = require('./services/encryption');
const proxy_server_URL = "http://proxy-server:8081";

class Client {

    static async Start(){

        console.clear();
        console.log("SISTEMA DE OPERACIONES - PROYECTO DE DISTRIBUIDOS POR DANIEL RIVERO Y JOSE FLORES");
        console.log("En el sistema se pueden ejecutar las siguientes operaciones: \n");
        console.log("1- FIRMAR");
        console.log("2- AUTENTICAR");
        console.log("3- INTEGRIDAD\n");
        console.log("El sistema buscará leer un archivo en la carpeta 'in', llamado input.txt, el cual detectará la operación a realizar y los datos provistos en el archivo.\n");
        console.log("LEYENDO ARCHIVO input.txt ...\n");
        let userData;
        try{
            userData = file.Read("in/input.txt");
        }catch(err){
            console.clear();
            throw new Error('Hubo un error al leer el archivo "input.txt", por favor verifique la existencia del mismo en la carpeta "in" en la raiz del proyecto. y vuelva a ejecutar');
        }

        let op = userData[0];
        console.log(`Operación a ejecutar es "${op}"\n`);

        switch (op) {
            case 'FIRMAR': //FIRMAR
                const key = await httpHandler.Post(`${proxy_server_URL}/sign`,{
                    username: userData[1],
                    messagetext: userData[2],
                });
                const messageHash = encryption.Encrypt(userData[2]);
                const signature = encryption.Encrypt(messageHash + key);
                file.Write("out/sign.txt",key,signature);
                console.log("SE HA FIRMADO ELECTRONICAMENTE EL DOCUMENTO.......");
                console.log("-----------FILE OUTPUT---------------------");
                console.log("LINE 1: " + key);
                console.log("LINE 2: " + signature);
                console.log('Puede revisar la salida en el archivo "out/sign.txt"');
                break;
            case 'AUTENTICAR': //'AUTENTICAR'
                const result = await httpHandler.Post(`${proxy_server_URL}/authenticate`,
                {
                    user: userData[2],
                    user_key:userData[1] 
                });
                if(result){
                    file.Write("out/authenticate.txt",'VÁLIDO');
                    console.log("SE HA VERIFICADO LA IDENTIDAD DEL USUARIO Y CLAVE INGRESADO.......")
                    console.log("-----------FILE OUTPUT---------------------");
                    console.log("LINE 1: VÁLIDO");
                }else{
                    file.Write("out/authenticate.txt",'INVÁLIDO');
                    console.log("SE HA VERIFICADO LA IDENTIDAD DEL USUARIO Y CLAVE INGRESADO.......")
                    console.log("-----------FILE OUTPUT---------------------");
                    console.log("LINE 1: INVÁLIDO");
                }
                console.log('Puede revisar la salida en el archivo "out/authenticate.txt"');
            break;
            case 'INTEGRIDAD': //'INTEGRIDAD'
            const signatureB1 = encryption.Encrypt(encryption.Encrypt(userData[2]) + userData[1]);
            const signatureB2 = userData[3];
            
            if (signatureB1 == signatureB2) {
                file.Write("out/integrity.txt",'INTEGRO');
                console.log("SE HA VERIFICADO LA INTEGRIDAD DEL MENSAJE.......")
                console.log("-----------FILE OUTPUT---------------------");
                console.log("LINE 1: INTEGRO");
            } else {
                file.Write("out/integrity.txt",'NO INTEGRO');
                console.log("SE HA VERIFICADO LA INTEGRIDAD DEL MENSAJE.......")
                console.log("-----------FILE OUTPUT---------------------");
                console.log("LINE 1: NO INTEGRO");
            }
            console.log('Puede revisar la salida en el archivo "out/integrity.txt"');

                break;
            default:
                break;
        }

    }


}

Client.Start();
