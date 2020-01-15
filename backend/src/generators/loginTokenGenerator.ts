require('dotenv').config({ path: '../../.env' })

import * as crypto from 'crypto';

export function generateHashedToken(user_email: string, user_agent: string, token: string, timestamp: string = Date.now().toString()): string {
    let unhashedToken = {
        email: user_email,
        agent: user_agent, 
        date: timestamp
    }
    const key = crypto.scryptSync(process.env[token], 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    let hashedToken = cipher.update(JSON.stringify(unhashedToken), 'utf8', 'base64');
    hashedToken += cipher.final('base64');
    return hashedToken; 
}

export function decryptHashedToken(hashedToken: string, token: string) {
    const key = crypto.scryptSync(process.env[token], 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    let unhashedToken = decipher.update(hashedToken, 'base64', 'utf8');
    unhashedToken += decipher.final('utf8');
    unhashedToken = JSON.parse(unhashedToken)
    return unhashedToken;
}