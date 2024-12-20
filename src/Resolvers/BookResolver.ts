import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Book, InputCreateBook } from "../entity/Books.js";
import { User } from "../entity/User.js";



@Resolver(() => Book)
export class BookResolver{
    @Query(() => [Book])
    async getBooks(){
        try {
            const books = await Book.find()
            return books; 
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation(() => Book)
    async createBook(@Args() data : InputCreateBook): Promise<Book> {
        try {
            const author = await User.findOne({where : {id : data.author_id}});

            const book = await Book.create({
                // name : data.name,
                ...data,
                author,
            }).save()

            return book;
        } catch (error) {
            console.error(error);
        }
    }
}
