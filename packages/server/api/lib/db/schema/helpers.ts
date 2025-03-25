import { sql } from "drizzle-orm";
import { customType, integer } from "drizzle-orm/sqlite-core";
import { isValidSuiAddress, normalizeSuiAddress } from "@mysten/sui/utils";

export const timestamps = {
    createdAt: integer().notNull().$default(() => Date.now()),
    deletedAt: integer(),
};

export const suiAddressType = customType<{
    data: string;
    driverData: string;
}>({
    dataType() {
        return "text";
    },
    toDriver(value) {
        if (!isValidSuiAddress(value)) {
            throw new Error(`Invalid Ethereum address: ${value}`);
        }
        return normalizeSuiAddress(value);
    },
    fromDriver(value) {
        return value;
    },
});
