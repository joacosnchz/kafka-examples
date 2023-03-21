const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'reporter-1',
    brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'reporting-service' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'reporting' });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if(topic == 'reporting') {
                console.log('Generating report');

                setTimeout(() => {
                    console.log('Report generated sucessfully')
                }, message.value.toString());
            }
        },
    });
}

run().catch(console.error);
