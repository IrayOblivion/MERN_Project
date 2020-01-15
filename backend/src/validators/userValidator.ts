import { getConnection } from "typeorm";
import { decryptHashedToken } from "../generators/loginTokenGenerator";
import{ Dictionary } from "express"; 
import User from "../entity/User";
import { validate } from "class-validator";
import { getSaltedPassword, getSaltFromPassword } from "../generators/saltedPasswordGenerator";

export const validateUser = async(params: Dictionary<string>) =>{
    let invalidParameters = {valid: true};
    let user = new User();
    Object.keys(user).forEach(function(key){
        invalidParameters[key]=false;
        user[key]=params[key]
    })

    const errors = await validate(user);

    if(errors.length > 0) {
        invalidParameters.valid = false;
        errors.forEach(function(error) {
            invalidParameters[error.property] = true;
        })
    }

    console.log("Number of errors:\t", errors.length);
    console.log("Errors:\t");
    errors.forEach(function(error){
        console.log(error.property,":\t", error.toString());
    });
    return invalidParameters;
}

export const validateLoginAttempt = async (params: Dictionary<string>) => {

    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);
    
    var LOGIN_INFO = {
        email: null,
        valid: true,
    }    

    let user = null;
    try {
        if( (user = await userRepository.createQueryBuilder("user").select("user.email").addSelect("user.password").where("user.email = :email", { email: params.email }).getOne()) == undefined) {
            throw new Error("There is no user with this email in database!");
        }
        else {
            try {
                if(user.password != getSaltedPassword(params.password,getSaltFromPassword(user.password)))
                    throw new Error("Wrong password for this user!");
                else
                    LOGIN_INFO.email = user.email;
            }
            catch(e) {
                console.log(e)
                LOGIN_INFO.valid=false;
            }
        }
    }
    catch(e) {
        console.log(e)
        LOGIN_INFO.valid=false;
    }

    return LOGIN_INFO;
}

export const validateLoginToken = async (cookies: Dictionary<string>) => {
    const tmp_connection = getConnection();
    const userRepository = tmp_connection.getRepository(User);

    var ACCESS_TOKEN_INFO = {
        timestamp_valid: false,
        valid: false,
        email: null
    }
    let token = null;
    try {
        token = decryptHashedToken(cookies.ul_tkn, 'TOKEN_KEY');
    } catch(e) {
        return ACCESS_TOKEN_INFO;
    }

    if((await userRepository.createQueryBuilder("user").select("user.email").where("user.email = :email", { email: token.email }).getOne()) == undefined)
         return ACCESS_TOKEN_INFO;
    else {
        if(token.date == undefined || Date.parse(token.date) > Date.now())
            return ACCESS_TOKEN_INFO;
        else
            ACCESS_TOKEN_INFO.timestamp_valid = true;
            ACCESS_TOKEN_INFO.valid = true;
            ACCESS_TOKEN_INFO.email = token.email;
    }
    return ACCESS_TOKEN_INFO;
}

