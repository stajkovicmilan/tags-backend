import * as Joi from "joi";

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  token?: string;
};

export const UserConstraints = {
  id: Joi.string().optional().allow(null),
  email: Joi.string().required(),
  username: Joi.string().optional().allow(null),
  firstName: Joi.string().optional().allow(null),
  lastName: Joi.string().optional().allow(null),
};
