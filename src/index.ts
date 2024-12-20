import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ArgumentValidationError, buildSchema, Query, Resolver } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone';
import { UserResolver } from "./Resolvers/UserResolver.js";
import { AppDataSource } from "../datasource.js";
import * as dotenv from 'dotenv';
import {client} from './utils/redis.js';
import { getUser } from "./context/context.js";
import { BookResolver } from "./Resolvers/BookResolver.js";


const main = async () => {
    //connecting to DB
    dotenv.config();
    AppDataSource.initialize()
        .then(() => {
            console.log("Database connected!")
        })
        .catch((err) => {
            console.log(err);
        })


        //redis client connection
        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

    const schema = await buildSchema({
        resolvers: [UserResolver,BookResolver]
    })

    const apolloServer = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {

            const token = req.headers.authorization || '';
        
            const user = getUser(token);

            const isblacklisted = await client.get(`blacklisted:${token}`);

            if(isblacklisted){
                return {};
            }
        
            return { user , client : client };
          },
    });

    console.log(`Server ready at ${url}`);
}

main()
    .catch((err) => {
        console.error(err);
    });
