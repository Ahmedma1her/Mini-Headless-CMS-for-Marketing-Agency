const joi = require('joi');

const textRegex = /^[a-zA-Z0-9\s.,!?_/:&#()@-]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
const registerSchema=
joi.object({
    username:joi.string().min(3).max(10).pattern(usernameRegex).required(),

    email:joi.string().email().required(),

    password:joi.string().min(8).max(20).pattern(passwordRegex).required()
    
})
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(passwordRegex).required()
});

const postSchema = joi.object().keys({
 title: joi.string().min(1).required(),
 description: joi.string().min(1).required(),
 category: joi.string().min(1).required(),
 status: joi.string().valid('draft', 'published').default('draft'), 
});
const updatePostSchema = joi.object().keys({
 title: joi.string().min(1),
 description: joi.string().min(1),
 category: joi.string().min(1),
 status: joi.string().valid('draft', 'published'),
}).min(1);
module.exports = { loginSchema, registerSchema,postSchema,updatePostSchema };
