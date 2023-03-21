const http = require('http');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'backend-1',
    brokers: ['kafka:9092']
});

const producer = kafka.producer();

http.createServer(async (request, response) => {
    if (request.url == '/generate-report') {
        console.log('Request received')
        await producer.connect();
        await producer.send({
            topic: 'reporting',
            messages: [
                { value: '15000' }
            ]
        });
        await producer.disconnect();
    }
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
    };
    response.writeHead(200, headers);
    response.write('OK');
    response.end();

    console.log('Response to frontend sent')
}).listen(process.env.PORT);

console.log(`Webserver listening on port: ${process.env.PORT}`);
