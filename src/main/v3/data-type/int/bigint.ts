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
bigint.nullable = () => sd.nullable(bigint());

const bigintSignedDelegate = sd.chain(
    bigintDelegate,
    (name : string, value : bigint) => {
        if (value < -9223372036854775808n) {
            throw new Error(`${name} must be >= -9,223,372,036,854,775,808`);
        }
        if (value > 9223372036854775807n) {
            throw new Error(`${name} must be <= 9,223,372,036,854,775,807`);
        }
        return value;
    }
);
export function bigintSigned () {
    return bigintSignedDelegate;
}
bigintSigned.nullable = () => sd.nullable(bigintSigned());

const bigintUnsignedDelegate = sd.chain(
    bigintDelegate,
    (name : string, value : bigint) => {
        if (value < 0n) {
            throw new Error(`${name} must be >= 0`);
        }
        if (value > 18446744073709551616n) {
            throw new Error(`${name} must be <= 18,446,744,073,709,551,616`);
        }
        return value;
    }
);
export function bigintUnsigned () {
    return bigintUnsignedDelegate;
}
bigintUnsigned.nullable = () => sd.nullable(bigintUnsigned());