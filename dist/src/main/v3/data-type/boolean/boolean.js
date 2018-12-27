"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
exports.assertBoolean = sd.or(sd.boolean(), sd.chain(sd.literal("0", "1", 0, 1), (name, v) => {
    switch (v) {
        case "0": return false;
        case "1": return true;
        case 0: return false;
        case 1: return true;
        default: {
            //Shouldn't happen
            throw new Error(`Expected ${name} to be one of '0'|'1'|0|1`);
        }
    }
}));
exports.assertTrue = sd.or(sd.literal(true), sd.chain(sd.literal("1", 1), (name, v) => {
    switch (v) {
        case "1": return true;
        case 1: return true;
        default: {
            //Shouldn't happen
            throw new Error(`Expected ${name} to be one of '1'|1`);
        }
    }
}));
exports.assertFalse = sd.or(sd.literal(false), sd.chain(sd.literal("0", 0), (name, v) => {
    switch (v) {
        case "0": return true;
        case 0: return true;
        default: {
            //Shouldn't happen
            throw new Error(`Expected ${name} to be one of '0'|0`);
        }
    }
}));
function boolean() {
    return exports.assertBoolean;
}
exports.boolean = boolean;
function getTrue() {
    return exports.assertTrue;
}
exports.true = getTrue;
function getFalse() {
    return exports.assertFalse;
}
exports.false = getFalse;
//# sourceMappingURL=boolean.js.map