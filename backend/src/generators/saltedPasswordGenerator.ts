import * as crypto from 'crypto';

export function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

export function sha512(password: string, salt: string) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash: value
    };
};

export function getSaltedPassword(userpassword: string, salt: string = genRandomString(16)): string{
    var passwordData = sha512(userpassword, salt);
    return passwordData.salt+passwordData.passwordHash;
}

export function getSaltFromPassword(userpassword: string): string {
    let salt: string = userpassword.substring(0,16);
    return salt;
}

export function checkPassword(userpassword: string, salteduserpassword: string): boolean {
    if(getSaltedPassword(userpassword,getSaltFromPassword(salteduserpassword)) == salteduserpassword)
        return true;
    return false
}