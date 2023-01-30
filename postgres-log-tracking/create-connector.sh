curl -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors/ -d '
{
"name": "postgres-connector",
"config": {
"topic.prefix": "postgres",
"connector.class": "io.debezium.connector.postgresql.PostgresConnector",
"tasks.max": "1",
"database.hostname": "postgres",
"plugin.name": "pgoutput",
"database.port": "5432",
"database.user": "admin",
"database.password": "admin",
"database.dbname" : "admin",
"database.server.name": "producer",
"database.whitelist": "postgres",
"database.history.kafka.bootstrap.servers": "kafka:9092",
"database.history.kafka.topic": "changes.inventory"
}
}'
