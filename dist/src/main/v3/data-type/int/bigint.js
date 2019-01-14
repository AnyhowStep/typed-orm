"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const bigintDelegate = sd.or((name, raw) => {
    if (typeof raw == "bigint") {
        return raw;
    }
    throw new Error(`Expected ${name} to be of type bigint, received ${sd.toTypeStr(raw)}`);
}, sd.chain(sd.string(), (name, str) => {
    try {
        const result = BigInt(str);
        if (result.toString() === str) {
            return result;
        }
        throw new Error(`${name} is not a valid bigint string`);
    }
    catch (err) {
        throw new Error(`${name} is not a valid bigint string; ${err.message}`);
    }
}), sd.chain(sd.finiteNumber(), (name, n) => {
    try {
        const result = BigInt(n);
        if (Number(result) === n) {
            return result;
        }
        throw new Error(`${name} is not a valid bigint number`);
    }
    catch (err) {
        throw new Error(`${name} is not a valid bigint number; ${err.message}`);
    }
}));
function bigint() {
    return bigintDelegate;
}
exports.bigint = bigint;
const bigintSignedDelegate = sd.chain(bigintDelegate, (name, value) => {
    if (value < -9223372036854775808n) {
        throw new Error(`${name} must be >= -9,223,372,036,854,775,808`);
    }
    if (value > 9223372036854775807n) {
        throw new Error(`${name} must be <= 9,223,372,036,854,775,807`);
    }
    return value;
});
function bigintSigned() {
    return bigintSignedDelegate;
}
exports.bigintSigned = bigintSigned;
const bigintUnsignedDelegate = sd.chain(bigintDelegate, (name, value) => {
    if (value < 0n) {
        throw new Error(`${name} must be >= 0`);
    }
    if (value > 18446744073709551616n) {
        throw new Error(`${name} must be <= 18,446,744,073,709,551,616`);
    }
    return value;
});
function bigintUnsigned() {
    return bigintUnsignedDelegate;
}
exports.bigintUnsigned = bigintUnsigned;
//# sourceMappingURL=bigint.js.map