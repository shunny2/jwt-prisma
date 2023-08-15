import Joi from 'joi';

import { IUser } from '../interfaces/user';

export const validateUser = (user: IUser) => {
    const schema = Joi.object<IUser>({
        name: Joi.string()
            .min(4)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),

        repeatPassword: Joi.ref('password')
    }).with('password', 'repeatPassword');

    return schema.validate(user, { presence: 'required' });
};

export const validateSignIn = (user: IUser) => {
    const schema = Joi.object<IUser>({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    });

    return schema.validate(user, { presence: 'required' });
};