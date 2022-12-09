const amqp =  require('amqplib');
const CONN_URL = `amqp://rabbit-server`;

class RabbitMQService{
    /*
    connection = async()=>{
        await amqp.connect(CONN_URL).catch((err)=>{
            throw new Error(`Ocurrio un error al conectar con el servidor de rabbitMQ: \n Detalle: ${err}`);
        });
    } 
    
    channel = async (connection)=>{
        await connection.createChannel().catch((err)=>{
            throw new Error(`Hubo un error al crear canal. \n Detalle: ${err}`);
        });
    }*/
    
    ConsumeQueueMsg = async (queueName)=>{
        let conn = await this.connection();
        let ch = await this.channel(conn);
        ch.consume(queueName,(msg)=>{
            console.log('Mensaje recibido: ',msg.content.toString());
            channel.ack(msg);
        },{noAck:false})
    }
    
    PublishToQueue = async (queueName,data)=>{
        let conn = await amqp.connect(CONN_URL);
        let ch = await conn.createChannel();
        ch.assertQueue(queueName,{durable:true});
        ch.sendToQueue(queueName,Buffer.from(data));
        //close connection
         setTimeout(()=>{
             conn.close();
         },500)
    } 
}

module.exports = new RabbitMQService();
