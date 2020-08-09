import * as Joi from "joi";
import { ValidationException } from "../infrastructure/exceptions";

export const validate = (data: any, validator: any, message?: string) => {
    const vr = Joi.validate(data, validator);

    if (vr.error) {
        throw new ValidationException(vr.error, message);
    }
};
