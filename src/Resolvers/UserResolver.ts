import "reflect-metadata";
import { Arg, Args, Ctx, Mutation, Resolver } from "type-graphql";
import { User, InputRegisterUser, InputLoginUser, AuthResponse } from "../entity/User.js";
import { Query } from "type-graphql";
import bcrypt from 'bcryptjs';
import { nanoid } from "nanoid";
import jwt from 'jsonwebtoken';
import { client } from "../utils/redis.js";

@Resolver(User)
export class UserResolver {
    @Query(() => String)
    async hello() {
        return "Hello"
    }

    @Query()
    async getUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation(() => AuthResponse)
    async RegisterUser(@Args() inp: InputRegisterUser): Promise<AuthResponse> {
        try {
            const hashedPassword = await bcrypt.hash(inp.password, 12);
            const randomid = nanoid();

            const user = await User.create({
                name: inp.name,
                email: inp.email,
                gender: inp.gender,
                password: hashedPassword,
                id: randomid
            }).save()

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1hr" }
            );

            return { token: token, userId: user.id };

        } catch (error) {
            console.log(error);
        }
    }

    @Mutation(() => String)
    async LoginUser(@Args() { email, password }: InputLoginUser): Promise<String> {
        const user = await User.findOneBy({ email: email as string });

        if (!user) {
            return "User not found"
        }

        const isValid = bcrypt.compare(password, user.password);

        if (!isValid) {
            return "Incorrect password"
        }

        const token = jwt.sign(
            { email: user.email, userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '6hr' },
        )

        return token;
    }

    @Mutation(() => String)
    async LogoutUser(@Arg("token") token: string, @Ctx() { client }: { client: any }): Promise<String> {
        try {
            await client.set(`blacklisted:${token}`, "true", "EX", 3600);
            return "Logged out successfully!"

        } catch (error) {
            console.log(error);
            return "Logout failed"
        }
    }


}
