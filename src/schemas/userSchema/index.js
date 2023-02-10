import Joi from "joi";

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const SignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});
