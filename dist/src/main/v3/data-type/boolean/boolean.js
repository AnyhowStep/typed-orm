"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
exports.assertBoolean = sd.mysql.boolean();
exports.assertTrue = sd.mysql.true();
exports.assertFalse = sd.mysql.false();
function boolean() {
    return sd.mysql.boolean();
}
exports.boolean = boolean;
boolean.nullable = () => sd.orNull(boolean());
function getTrue() {
    return sd.mysql.true();
}
exports.true = getTrue;
getTrue.nullable = () => sd.orNull(getTrue());
function getFalse() {
    return sd.mysql.false();
}
exports.false = getFalse;
getFalse.nullable = () => sd.orNull(getFalse());
//# sourceMappingURL=boolean.js.map