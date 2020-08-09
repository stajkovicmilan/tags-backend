import * as Joi from "joi";

export interface ILink {
    url: string;
    domain?: string;
    userId: string;
    tags: string[];
}

export const ILinkConstraints = {
    url: Joi.string().required(),
    tags: Joi.array().required(),
};
