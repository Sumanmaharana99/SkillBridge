import amqp from "amqplib";

let channel;
export const connectRabbitMQ = async()=>{
    try{
const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("emailQueue",{
        durable:true,
    })
    console.log("RabbitMQ connected");
    }
    catch(error){
        console.log("Rabbit MQ error: ",error);
    }
}
export const getChannel =()=> channel;