const joi = require('joi');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
}

const postSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    status: joi.string().valid('draft', 'published').default('draft'),
});

module.exports = { validateRequest, postSchema };