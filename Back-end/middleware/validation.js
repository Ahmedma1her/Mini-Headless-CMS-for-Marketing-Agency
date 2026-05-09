const joi = require('joi');
// const validateRequest = (schema) => {
//  return (req, res, next) => {
//  const validSchema = schema;

//  const { error } = joi.validate(req.body, validSchema);
//  if (error) {
//  return res.status(400).json({ message: error.details[0].message });
//  }
//  next();
//  };
// }
const textRegex = /^[a-zA-Z0-9\s.,!?_-]+$/;
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
 title: joi.string().pattern(textRegex).required(),
 description: joi.string().pattern(textRegex).required(),
 category: joi.string().pattern(textRegex).required(),
 status: joi.string().valid('draft', 'published').default('draft'), 
});
const updatePostSchema = joi.object().keys({
 title: joi.string().pattern(textRegex),
 description: joi.string().pattern(textRegex),
 category: joi.string().pattern(textRegex),
 status: joi.string().valid('draft', 'published'),
}).min(1);
module.exports = { loginSchema, registerSchema,postSchema,updatePostSchema };
