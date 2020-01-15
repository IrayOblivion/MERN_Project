import { Request, Response } from "express";
import { getConnection } from "typeorm";
import User from "../entity/User";
import Offer, { 
    Hand, 
    Strings, 
    Frets, 
    Brands, 
    PickUps
} from "../entity/Offer";
import { validateUser, validateLoginToken, validateLoginAttempt } from "../validators/userValidator";
import { getSaltedPassword } from "../generators/saltedPasswordGenerator";
import { generateHashedToken } from "../generators/loginTokenGenerator";

export const LOGIN_TIMEOUT = 60 * 60 * 1000;

export const BasicContent = async (req: Request, res: Response) => {
    const offerRepository = getConnection().getRepository(Offer);     
    let offers = await offerRepository.find();
    let tmp = [];
    for(var i=0; i<4; i++)
        tmp.push(offers.splice(Math.floor(Math.random() * (offers.length)),1)[0]);
    return res.json(tmp);
}

export const Register = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);
    const errors = await validateUser(req.body);

    var confirm = null;
    console.log(await userRepository.findOne({email:req.body.email}))
   
    if(errors.valid == true) {
        let user = await userRepository.create(req.body);
        user['password']=getSaltedPassword(user['password']);
        confirm = await userRepository.save(user);
    }

    return res.json({
        "errors": errors,
        "valid": errors.valid,
        "confirm": confirm
    });
}

export const Login = async (req: Request, res: Response) => {
    const results = await validateLoginAttempt(req.body);
    if(results.valid == true) {
        let hashedToken = generateHashedToken(results.email,req.headers["user-agent"],'TOKEN_KEY');
        res.cookie("ul_tkn", hashedToken, { expires: new Date(Date.now() + LOGIN_TIMEOUT)});
        return res.json(results);
    }
    res.clearCookie("ul_tkn");
    return res.json(results);
}

export const Guitars = async (req: Request, res: Response) => {
    const offerRepository = getConnection().getRepository(Offer);
    let guitars = null;
    if(Object.keys(req.query).length === 0) {
        guitars = await offerRepository
        .createQueryBuilder("offer")
        .leftJoin("offer.owner", "user")
        .select("offer")
        .addSelect("user.username")
        .getMany();
    } else {
        let tmp = {
            hand: Object.values(Hand),
            strings: Object.values(Strings),
            frets: Object.values(Frets),
            brands: Object.values(Brands),
            pickups: Object.values(PickUps)
        }
        for(var key in req.query) {
            if(typeof(req.query[key])==="string")
                tmp[key]=[req.query[key],]
            else
                tmp[key]=req.query[key]
        }
        guitars = await offerRepository
        .createQueryBuilder("offer")
        .leftJoin("offer.owner", "user")
        .select("offer")
        .addSelect("user.username")
        .where("offer.hand IN (:...hands)", { hands: tmp.hand })
        .andWhere("offer.strings IN (:...strings)", { strings: tmp.strings })
        .andWhere("offer.frets IN (:...frets)", { frets: tmp.frets })
        .andWhere("offer.brand IN (:...brands)", { brands: tmp.brands })
        .andWhere("offer.pickup IN (:...pickups)", { pickups: tmp.pickups })
        .getMany();
    }

    return res.json({
        params: {
            'hand': Object.values(Hand),
            'strings': Object.values(Strings),
            'frets': Object.values(Frets),
            'brands': Object.values(Brands),
            'pickups': Object.values(PickUps)
        },
        'offers': guitars
    });
}

export const GuitarSpecific = async (req: Request, res: Response) => {
    const offerRepository = getConnection().getRepository(Offer);     
    let offer = await offerRepository.findOne(req.params.id);
    return res.json(offer);
}
