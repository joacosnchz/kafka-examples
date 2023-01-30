const http = require('http');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: process.env.SERVICE_NAME,
    brokers: ['kafka:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'webserver2' });

http.createServer(async (request, response) => {
    if (request.url == '/') {
        await producer.connect();
        await producer.send({
            topic: process.env.SERVICE_NAME,
            messages: [
                { value: `Hello from ${process.env.SERVICE_NAME}!` }
            ]
        });
        await producer.disconnect();
    }
    
    response.writeHead(200);
    response.write(`Hello from ${process.env.SERVICE_NAME}!`);
    response.end();
}).listen(process.env.PORT);

console.log(`Webserver listening on port: ${process.env.PORT}`);

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'webserver1', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    });
}

run().catch(console.error);
