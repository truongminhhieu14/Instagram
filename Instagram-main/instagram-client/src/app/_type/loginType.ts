import Joi from "joi";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface SuccessLogin{
    user: {
      user_id: string,
      username: string,
      email: string,
      avatar: string,
    },
    accessToken: string,
    refreshToken: string,
    message: string
}

export const loginFormSchema = Joi.object({
  email: Joi.string().min(5).max(15).alphanum().required().messages({
    "string.min": `Username should have a minimum length of {#limit}`,
    "string.max": `Username should have a maximum length of {#limit}`,
    "string.empty": `username cannot be an empty field`,
  }),
  password: Joi.string().min(6).max(15).required().messages({
    "string.min": `Password should have a minimum length of {#limit}`,
    "string.max": `Password should have a maximum length of {#limit}`,
    "string.empty": `password cannot be an empty field`,
  }),
});
