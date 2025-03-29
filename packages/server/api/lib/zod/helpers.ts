import { isValidSuiAddress, normalizeSuiAddress } from "@mysten/sui/utils";
import { z } from "zod";

export const zJsonStringSchema = z.string().refine((value) => {
    try {
        JSON.parse(value);
        return true;
    } catch (_) {
        return false;
    }
}).transform((value) => JSON.parse(value));


export const zNumberString = z.string().refine((value) => {
    try {
        Number(value);
        return true;
    } catch (_) {
        return false;
    }
}).transform((value) => Number(value));

export const zSuiAddress = z.string().refine((value) => {
    return isValidSuiAddress(value)
}).transform((value) => normalizeSuiAddress(value))

