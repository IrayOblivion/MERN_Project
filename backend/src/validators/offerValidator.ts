import{Dictionary} from "express"; 
import Offer from "../entity/Offer";
import {validate} from "class-validator";

export const validateOffer = async(params: Dictionary<string>) =>{
    let invalidParameters = {valid: true};
    let offer = new Offer();
    Object.keys(offer).forEach(function(key) {
        invalidParameters[key]=false;
        offer[key]=params[key]
    })
    const errors = await validate(offer);
    if(errors.length > 0) {
        invalidParameters.valid = false;
        errors.forEach(function(error) {
            invalidParameters[error.property] = true;
        })
    }

    //to check
    console.log("Number of errors:\t", errors.length);
    console.log("Errors:\t");
    errors.forEach(function(error){
        console.log(error.property,":\t", error.toString());
    });
    return invalidParameters;
}