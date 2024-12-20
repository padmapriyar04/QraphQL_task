import { ArgsType, Field, ID, ObjectType, Query } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.js";


@ObjectType()
@Entity('Book')
export class Book extends BaseEntity{
    @Field()
    @Column()
    name! : string;

    @Field(() => ID)
    @PrimaryColumn()
    Id : string;

    @Field(() => User)
    @ManyToOne(() => User,(user) => user.books)
    author! : User;
}

@ArgsType()
export class InputCreateBook{
    @Field()
    name : string;

    @Field()
    author_id : string;
}
