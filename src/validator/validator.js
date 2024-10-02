import Joi from "joi";

const Validator = {
    'POST/api/v1/create/user':Joi.object().keys({
        email : Joi.string().email().required(),
        name : Joi.string().required(),
        password : Joi.string()
                    .min(8)
                    .max(30)
                    .pattern(new RegExp('(?=.*[A-Z])'))
                    .pattern(new RegExp('(?=.*[a-z])'))
                    .pattern(new RegExp('(?=.*\\d)'))
                    .pattern(new RegExp('(?=.*[@$!%*?&])'))
                    .required(),
    }),
    'POST/api/v1/login/user' : Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().required(),
    })
}

export default Validator ;