import * as sd from "schema-decorator";

export const bigint = sd.or(
    (name : string, raw : unknown) : bigint => {
        if (typeof raw == "bigint") {
            return raw;
        }
        throw new Error(`Expected ${name} to be of type bigint, received ${sd.toTypeStr(raw)}`);
    },
    sd.chain(
        sd.string(),
        (name : string, str : string) : bigint => {
            const result = BigInt(str);
            if (result.toString() === str) {
                return result;
            }
            throw new Error(`${name} is not a valid bigint string`);
        }
    ),
);
