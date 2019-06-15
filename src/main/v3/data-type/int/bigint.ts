import * as sd from "type-mapping";

const bigintDelegate = sd.or(
    (name : string, raw : unknown) : bigint => {
        if (typeof raw == "bigint") {
            return raw;
        }
        throw new Error(`Expected ${name} to be of type bigint, received ${sd.TypeUtil.toTypeStr(raw)}`);
    },
    sd.pipe(
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
    sd.pipe(
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
function bigint () {
    return bigintDelegate;
}
bigint.nullable = () => sd.orNull(bigint());

const bigintSignedDelegate = sd.pipe(
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
function bigintSigned () {
    return bigintSignedDelegate;
}
bigintSigned.nullable = () => sd.orNull(bigintSigned());

const bigintUnsignedDelegate = sd.pipe(
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
function bigintUnsigned () {
    return bigintUnsignedDelegate;
}
bigintUnsigned.nullable = () => sd.orNull(bigintUnsigned());

export {bigint, bigintSigned, bigintUnsigned}