# Instructions
1. Run `docker-compose up`
2. Run `create-connector.sh`
3. Connect to the kafka container and run `/opt/bitnami/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic postgres.public.events --from-beginning`
4. Connect to postgres container and run queries on `events.sql`
5. See the messages arriving on the kafka console
