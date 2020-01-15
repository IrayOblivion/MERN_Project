import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import{Dictionary} from "express"; 
import User from "./User";
import { 
    IsDate, 
    IsDecimal, 
    IsInt, 
    Min, 
    Max, 
    Length,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    IsDefined,
    IsEnum
} from "class-validator";

export const Hand = {
    LEFT: "left",
    RIGHT: "right",   
}

export const Strings = {
    SEVEN: "7",
    SIX: "6",    
}

export const Frets = {
    TWOFOUR: "24",
    TWOTHREE: "23",
    TWOTWO: "22"
}

export const Brands = {
    IBANEZ: "ibanez",
    EPIPHONE: "epiphone",
    FENDER: "fender",
    GIBSON: "gibson",
    YAMAHA: "yamaha",
    LES_PAULS: "les pauls"
}

export const PickUps = {
    SSH: "ssh",
    HH: "hh",
    SSS: "sss"
}

export const Controls = {
    TWO: "2",
    THREE: "3",
    FOUR: "4"
}

@Entity()
export class Offer {
    constructor() { 
        this.id=null;
        this.model=null;
        this.body=null;
        this.neck=null;
        this.fingerboard=null;
        this.color=null;
        this.weight=null;
        this.scale=null;
        this.frets=null;
        this.strings=null;
        this.hand=null;
        this.pickup=null;
        this.brand=null;
        this.switch=null;
        this.controls=null;
        this.published=null;
        this.price=null;
        this.description=null;
        this.owner=null;
    }
       
    @PrimaryGeneratedColumn({type: "int"})
    id: number;

    @Column({type: "varchar", length: 100})
    @Length(3, 100)
    @IsNotEmpty()
    model: string;

    @Column({type: "varchar", length: 100})
    @Length(3, 100)
    @IsNotEmpty()
    body: string;

    @Column({type: "varchar", length: 100})
    @Length(3, 100)
    @IsNotEmpty()
    neck: string;

    @Column({type: "varchar", length: 100})
    @Length(3, 100)
    @IsNotEmpty()
    fingerboard: string;

    
    @Column({type: "varchar", length: 100, nullable: true})
    @IsOptional()
    @Length(3, 10)
    color: string;

    @Column({type: "float", nullable: true})
    @IsOptional()
    @Min(0.01)
    weight: number;

    @Column({type:"float"})
    @IsNotEmpty()

    @Min(24.75)
    @Max(28.00)
    scale: number;

    @Column({type: "enum", enum: Frets, default: Frets.TWOTWO})
    @IsEnum(Frets)
    frets: string;

    @Column({type: "enum", enum: Strings, default: Strings.SIX})
    @IsEnum(Strings)
    strings: string;

    @Column({type:"enum", enum: Hand, default: Hand.RIGHT})
    @IsEnum(Hand)
    hand: string;

    @Column({type:"enum", enum: PickUps, default: PickUps.SSH})
    @IsEnum(PickUps)
    pickup: string;

    @Column({type:"enum", enum: Brands, default: Brands.EPIPHONE})
    @IsEnum(Brands)
    brand: string;

    @Column({default:false, nullable: true})
    @IsOptional()
    @IsBoolean()
    switch: boolean

    @Column({type:"enum", enum: Controls, default: Controls.TWO})
    @IsEnum(Controls)
    controls: string;

    @Column({type: "timestamp"})

    @IsNotEmpty()
    published: string;

    @Column({type: "float"})

    @Min(0.01)
    @IsNotEmpty()
    price: number;

    @Column({type: "varchar", length: 400})
    @Length(3, 400)
    @IsNotEmpty()
    description: string;

    @ManyToOne(type=>User, user=>user.offers)
    @JoinColumn()
    owner: User;
}

export default Offer;