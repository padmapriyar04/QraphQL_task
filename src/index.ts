import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema, Query, Resolver } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone';
import { UserResolver } from "./modules/UserResolver.js";
import { AppDataSource } from "../datasource.js";
import * as dotenv from 'dotenv';



const main = async() =>{
    //connecting to DB
    dotenv.config();
    await AppDataSource.initialize();

    const schema = await buildSchema({
        resolvers : [UserResolver]
    })

    const apolloServer = new ApolloServer({schema});

    const {url} = await startStandaloneServer(apolloServer,{
        listen : {port: 4000},
    });

    console.log(`Server ready at ${url}`);
}

main().then(()=>{
    console.log('Server ready' );
})
.catch((err)=>{
    console.error(err);
});