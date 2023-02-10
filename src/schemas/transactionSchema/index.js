import Joi from "joi";

export const TransactionSchema = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
  date: Joi.string().required(),
});
