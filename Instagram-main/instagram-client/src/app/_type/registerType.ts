import Joi from "joi";

export interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const registerFormSchema = Joi.object({
  username: Joi.string().min(5).max(15).alphanum().required().messages({
    'string.min': `Username should have a minimum length of {#limit}`,
    'string.max': `Username should have a maximum length of {#limit}`,
    'string.empty': `username cannot be an empty field`,

  }),
  email: Joi.string().email({tlds: {allow: false}}).required().messages({
    'string.email': `Email should be a valid email`,
    'string.empty': `email cannot be an empty field`,
  }),
  password: Joi.string().min(6).max(15).required().messages({
    'string.min': `Password should have a minimum length of {#limit}`,
    'string.max': `Password should have a maximum length of {#limit}`,
    'string.empty': `password cannot be an empty field`,
  }),
  passwordConfirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm password does not match" }),
});
