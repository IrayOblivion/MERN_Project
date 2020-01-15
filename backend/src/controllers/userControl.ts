import { Request, Response } from "express";
import { getConnection, Connection } from "typeorm";
import User from "../entity/User";
import Offer, { 
    Hand, 
    Strings, 
    Frets, 
    Brands, 
    PickUps,
    Controls
} from "../entity/Offer";
import { validateOffer } from "../validators/offerValidator";
import { validateLoginToken } from "../validators/userValidator";
export const LOGIN_TIMEOUT = 60 * 60 * 1000;

export const Profile= async(req: Request,res: Response)=>{
    const userRepository = getConnection().getRepository(User); 
    const ul_tknData = await validateLoginToken(req.cookies);
    let user = null;
    if(ul_tknData.valid == true ) {
        user = await userRepository.createQueryBuilder("user").leftJoinAndSelect("user.offers", "offer").limit(3).where("user.email = :email", { email: ul_tknData.email }).getOne();
        delete user.password;
    }
    return res.json({
        "user": user,
        "valid": ul_tknData.valid
    });
}

export const Offers =async (req:Request , res: Response)=>{
    const userRepository = getConnection().getRepository(User);
    const ul_tknData = await validateLoginToken(req.cookies);
    let user = null;
    if(ul_tknData.valid == true) {
        user = await userRepository.createQueryBuilder("user").leftJoinAndSelect("user.offers", "offer").where("user.email = :email", { email: ul_tknData.email }).getOne();
        return res.json({
            "offers": user.offers,
            "valid": ul_tknData.valid
        });
    }
    return res.json({
        "valid": ul_tknData.valid
    });

}

export const OfferTemplate = async(req:Request , res: Response) => {
    var template = new Offer();
    delete template.published;
    delete template.owner;
    delete template.id;
    var ul_tknData = await validateLoginToken(req.cookies);
    if(ul_tknData.valid == true)
        return res.json({
            params: {
                'hand': Object.values(Hand),
                'strings': Object.values(Strings),
                'frets': Object.values(Frets),
                'brand': Object.values(Brands),
                'pickup': Object.values(PickUps),
                'controls': Object.values(Controls)
            },
            "template": template,
            "valid": ul_tknData.valid
        });
    else
        return res.json({
            "valid": ul_tknData.valid
        });
}

export const OfferAdd = async(req: Request,res: Response)=>{
    const offerRepository = getConnection().getRepository(Offer);
    const userRepository = getConnection().getRepository(User);
    var ul_tknData = await validateLoginToken(req.cookies);
    var offer = null;
    var offerValidationFeedback = null;
    var confirm = false;
    if(ul_tknData.valid == true) {
        let params = req.body;
        params.price=parseFloat(params.price)
        params.scale=parseFloat(params.scale)
        if(params.color!=null){
            if (params.color!=""){
                params.color=null
            }
        }
        if(params.weight!=null){
            if (params.weight!=""){
                params.weight=null
            }
        }
        
        if(params.switch!=null){
            if (params.weight!=""){
                params.weight=null
            }
        }
        params["owner"] = await userRepository.findOne({email: ul_tknData.email});
        params["published"] = new Date().toISOString();
        offerValidationFeedback = await validateOffer(params);
        if(offerValidationFeedback["valid"] == true) {
            offer = offerRepository.create(req.body);
            confirm = await offerRepository.save(offer);
        } 
    }
    return res.json({
        "errors": offerValidationFeedback,
        "valid_e": offerValidationFeedback["valid"],
        "valid": ul_tknData.valid,
        "confirm": confirm
    });
}

export const OfferRemove = async (req: Request, res: Response)=>{
    const offerRepository = getConnection().getRepository(Offer);
    const ul_tknData = await validateLoginToken(req.cookies);   
    let response = Object.assign(ul_tknData); 
    if(ul_tknData.valid == true) {
        const confirm = await offerRepository.delete(req.params.id);
        response["success"] = confirm?true:false;
    }
    return res.json(response);
}

export const OfferUpdate=async  (req: Request, res: Response)=>{
    const offerRepository = getConnection().getRepository(Offer);   
    const userRepository = getConnection().getRepository(User);  
    const ul_tknData = await validateLoginToken(req.cookies);
    var offer = null;
    var offerValidationFeedback = null;
    var confirm = false;
    if(ul_tknData.valid == true) {
        let params = req.body;
        
        params.model=String(params.model)
        params.price=parseFloat(params.price)
        params.scale=parseFloat(params.scale)
        if(params.color!=null){
            if (params.color==""){
                params.color=null
            }
        }
        if(params.weight!=null){
            if (params.weight==""){
                params.weight=null
            }
        }
        
        if(params.switch!=null){
            if (params.switch==""){
                params.switch=null
            }
        }
        params["owner"] = await userRepository.findOne({email: ul_tknData.email});
        params["published"] = new Date().toISOString();
        offerValidationFeedback = await validateOffer(params);
        if(offerValidationFeedback["valid"] == true) {
            offer = offerRepository.update(req.params.id, params)
            confirm = await offerRepository.save(offer);
        }
    }
    console.log(offerValidationFeedback,ul_tknData)
    return res.json({
        "errors": offerValidationFeedback,
        "valid_e": offerValidationFeedback["valid"],
        "valid": ul_tknData.valid,
        "confirm": confirm
    });
}

export const OfferDetails=async  (req: Request, res: Response)=>{
    const offerRepository = getConnection().getRepository(Offer);     
    const ul_tknData = await validateLoginToken(req.cookies);
    let offer = null;
    if(ul_tknData.valid == true ) {
        offer = await offerRepository.findOne(req.params.id);
        delete offer.owner;
        delete offer.published;
    }
    return res.json({"offer": offer});
}