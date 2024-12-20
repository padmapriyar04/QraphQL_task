import { IsEmail, Length, MaxLength } from "class-validator";
import { ArgsType, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Book } from "./Books.js";


@ObjectType()
@Entity('User')
export class User extends BaseEntity{
    @Field()
    @Column("varchar",{length:100})
    name! : string;

    @Field()
    @Column("boolean",{default:false})
    verified : boolean;

    @Field(()=> ID)
    @PrimaryColumn()
    id : string;

    @Field()
    @Column("text",{unique:true})
    email! : string;

    @Column({unique:true})
    password : string;

    @Field()
    @Column("char",{length:1})
    gender! : string;

    @Field(() => [Book])
    @OneToMany(() => Book,(book) => book.author)
    books : Book[]

}

@ArgsType()
export class InputRegisterUser{
    @Field(type => String, {nullable:false})
    @Length(1,255)
    name : string;

    @Field(type =>String,{nullable : false})
    @IsEmail()
    email : string;

    @Field(type => String,{nullable:false})
    @MaxLength(1,{message: "Gender has to be a single character(M/F)"})
    gender : string;

    @Field(type => String,{nullable : false})
    password : string;
}

@ArgsType()
export class InputLoginUser{
    @Field(type => String, {nullable : false})
    @IsEmail()
    email : string

    @Field(type =>String, {nullable : false})
    password : string
}

@ObjectType()
export class AuthResponse {
    @Field()
    token!: string;
  
    @Field()
    userId!: string;
  }
  
