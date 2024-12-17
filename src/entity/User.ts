import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";


@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field()
    @Column("varchar",{length:100})
    name! : string;

    @Field()
    @Column("boolean",{default:false})
    verified : boolean;

    @Field(()=> ID)
    @PrimaryColumn()
    id : number;

    @Field()
    @Column("text",{unique:true})
    email! : string;

    @Column({unique:true})
    password : string;

    @Field()
    @Column("char",{length:1})
    gender! : string;

}
