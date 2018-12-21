"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
exports.bigint = sd.or((name, raw) => {
    if (typeof raw == "bigint") {
        return raw;
    }
    throw new Error(`Expected ${name} to be of type bigint, received ${sd.toTypeStr(raw)}`);
}, sd.chain(sd.string(), (name, str) => {
    const result = BigInt(str);
    if (result.toString() === str) {
        return result;
    }
    throw new Error(`${name} is not a valid bigint string`);
}));
//# sourceMappingURL=bigint.js.map