import joi from 'joi';

export const validateUser = (data: object) => {
    const schema = joi.object().keys({
        name: joi.string()
            .min(4)
            .max(30)
            .required(),

        email: joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    
    return schema.validate(data, { presence: 'required' });
};