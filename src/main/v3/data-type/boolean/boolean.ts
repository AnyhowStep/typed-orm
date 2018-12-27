import * as sd from "schema-decorator";

export const assertBoolean = sd.or(
    sd.boolean(),
    sd.chain(
        sd.literal("0", "1", 0, 1),
        (name : string, v : "0"|"1"|0|1) => {
            switch (v) {
                case "0": return false;
                case "1": return true;
                case 0: return false;
                case 1: return true;
                default : {
                    //Shouldn't happen
                    throw new Error(`Expected ${name} to be one of '0'|'1'|0|1`);
                }
            }
        }
    )
);
export const assertTrue = sd.or(
    sd.literal(true),
    sd.chain(
        sd.literal("1", 1),
        (name : string, v : "1"|1) => {
            switch (v) {
                case "1": return true;
                case 1: return true;
                default : {
                    //Shouldn't happen
                    throw new Error(`Expected ${name} to be one of '1'|1`);
                }
            }
        }
    )
);
export const assertFalse = sd.or(
    sd.literal(false),
    sd.chain(
        sd.literal("0", 0),
        (name : string, v : "0"|0) => {
            switch (v) {
                case "0": return true;
                case 0: return true;
                default : {
                    //Shouldn't happen
                    throw new Error(`Expected ${name} to be one of '0'|0`);
                }
            }
        }
    )
);

export function boolean () {
    return assertBoolean;
}

function getTrue () {
    return assertTrue;
}
function getFalse () {
    return assertFalse;
}
export {
    getTrue as true,
    getFalse as false,
}