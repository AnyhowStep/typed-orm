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
//# sourceMappingURL=bigint.js.map