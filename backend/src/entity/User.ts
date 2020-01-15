import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany,
    JoinTable
} from "typeorm";
import {
    Length,
    IsEmail,
    IsPhoneNumber,
    IsNotEmpty,
    IsString
} from "class-validator";
import Offer from "./Offer";

@Entity()
export class User {
    constructor() { 
        this.username=null;
        this.firstName=null;
        this.lastName=null;
        this.email=null;
        this.tel=null;
        this.address=null;
        this.place=null;
        this.postCode=null;
        this.password=null;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 30})
    @Length(1, 30)
    @IsNotEmpty()
    username: string
    
    @Column({type: "varchar", length: 30})
    @Length(1,30)
    @IsNotEmpty()
    firstName: string;

    @Column({type: "varchar", length: 30})
    @Length(1,30)
    @IsNotEmpty()
    lastName: string;

    @Column({type: "varchar", length: 30, unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({type: "varchar", length: 30, unique: true})
    @IsPhoneNumber("PL")
    @IsNotEmpty()
    tel: number;

    @Column({type: "varchar", length: 100})
    @IsNotEmpty()
    address: string;

    @Column({type: "varchar", length: 100})
    @IsNotEmpty()
    place: string;

    @Column({type: "varchar", length: 10})
    @IsNotEmpty()
    @IsString()
    @Length(6,7)
    postCode: string;

    @Column("text")
    @IsNotEmpty()
    password: string;
   
    @OneToMany(type => Offer, offer => offer.owner, {eager: true})
    @JoinTable()
    offers: Offer[];
}

export default User;