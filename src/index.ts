import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { useContainer as routingUseContainer } from "routing-controllers";
import { createConnection } from "typeorm";
import { useContainer as ormUseContainer } from "typeorm";
import { Container } from "typedi";

import dotenv from 'dotenv';
dotenv.config();

import app from "./app";

routingUseContainer(Container);
ormUseContainer(Container);

createConnection({
    type: "postgres",
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PWD,
    database: process.env.PG_DATABASE,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    synchronize: false,
    logging: true,
    migrationsTableName: "migrations",
    entities: [
        "src/entities/**/*.ts"
    ],
    subscribers: [
        "src/subscribers/**/*.ts"
    ],
    cli: {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscriber"
    }
}).then(() => {

  useExpressServer(app, {
    controllers: [__dirname + "/controllers/*.ts"],
    validation: false,
    development: true
  });

  // Run app
  app.listen(3000);

  console.log("Estradeiro API up at port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));


