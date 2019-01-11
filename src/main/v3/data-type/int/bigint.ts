import * as sd from "schema-decorator";

const bigintDelegate = sd.or(
    (name : string, raw : unknown) : bigint => {
        if (typeof raw == "bigint") {
            return raw;
        }
        throw new Error(`Expected ${name} to be of type bigint, received ${sd.toTypeStr(raw)}`);
    },
    sd.chain(
        sd.string(),
        (name : string, str : string) : bigint => {
            try {
                const result = BigInt(str);
                if (result.toString() === str) {
                    return result;
                }
                throw new Error(`${name} is not a valid bigint string`);
            } catch (err) {
                throw new Error(`${name} is not a valid bigint string; ${err.message}`);
            }
        }
    ),
    sd.chain(
        sd.finiteNumber(),
        (name : string, n : number) : bigint => {
            try {
                const result = BigInt(n);
                if (Number(result) === n) {
                    return result;
                }
                throw new Error(`${name} is not a valid bigint number`);
            } catch (err) {
                throw new Error(`${name} is not a valid bigint number; ${err.message}`);
            }
        }
    ),
);
export function bigint () {
    return bigintDelegate;
}