    import Joi from 'joi';

    export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
    }),
    password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
    }),
    });

    export const registerSchema = Joi.object({
        firstName: Joi.string().min(2).max(256).required(),
        middleName: Joi.string().min(2).max(256).allow(''),
        lastName: Joi.string().min(2).max(256).required(),
    
        phone: Joi.string().min(9).max(11).required(),
    
        email: Joi.string().email({ tlds: { allow: false } }).min(5).required(),
    
        password: Joi.string().min(7).max(20).required(),
    
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        }),
    
        imageUrl: Joi.string().uri().min(14).allow(''),
        imageAlt: Joi.string().min(2).max(256).allow(''),
    
        state: Joi.string().min(2).max(256).required(),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.string().min(1).max(256).required(),
        zipCode: Joi.string().min(5).max(10).required(),

        isBuisness : Joi.boolean().required(),
    });      