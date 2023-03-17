const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'reporter-1',
    brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'reporting-service' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'reporting', fromBeginning: true });

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
