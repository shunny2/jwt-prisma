import { v4 } from 'uuid';

/**
 * This function is responsible for generate a UUID (version 4) for the email token.
 * @returns string
 */
const generateNewToken = () => {
    const confirmation_email_token = v4();
    return confirmation_email_token;
};

/**
 * This function is responsible for generating the token expiration (in minutes). The default value is 20.
 * @param minutes number
 * @returns date
 */
const generateExpirationDate = (minutes: number = 20) => {
    if (minutes <= 0)
        throw new Error('Invalid expiration duration (minutes must be positive).');

    const now = new Date();
    const email_token_expiry = new Date(now.getTime() + minutes * 60 * 1000);

    return email_token_expiry;
};

export const emailToken = {
    generateNewToken,
    generateExpirationDate
};