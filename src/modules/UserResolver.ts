import { Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User.js";
import { Query } from "type-graphql";

@Resolver(User)
export class UserResolver {
    @Query(() => String)
    async hello() {
        return "Hello"
    }


}
