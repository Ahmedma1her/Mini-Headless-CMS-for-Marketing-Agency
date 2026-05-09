const joi = require('joi');
const validateRequest = (schema) => {
 return (req, res, next) => {
 const validSchema = schema;
 const { error } = joi.validate(req.body, validSchema);
 if (error) {
 return res.status(400).json({ message: error.details[0].message });
 }
 next();
 };
}

const post = joi.object().keys({
 title: joi.string().required(),
 description: joi.string().required(),
 category: joi.string().required(),
 status: joi.string().valid('draft', 'published').default('draft'), 
});
module.exports = { validateRequest, post };