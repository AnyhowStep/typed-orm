"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
function bufferDelegate(dataTypeStr, absoluteMax) {
    const result = (a, b) => {
        if (a == undefined) {
            return sd.bufferLength({
                max: absoluteMax,
            });
        }
        else if (b == undefined) {
            a = sd.pipe(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", a);
            return sd.bufferLength({
                max: a,
            });
        }
        else {
            a = sd.pipe(sd.integer(), sd.gtEq(0), sd.ltEq(absoluteMax))("minLength", a);
            b = sd.pipe(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.bufferLength({
                min: a,
                max: b,
            });
        }
    };
    result.nullable = (a, b) => {
        return sd.orNull(result(a, b));
    };
    return result;
}
exports.bufferDelegate = bufferDelegate;
exports.binary = bufferDelegate("BINARY", 255);
exports.varBinary = bufferDelegate("VARBINARY", 65535);
exports.tinyBlob = bufferDelegate("TINYBLOB", 255);
exports.blob = bufferDelegate("BLOB", 65535);
exports.mediumBlob = bufferDelegate("MEDIUMBLOB", 16777215);
exports.longBlob = bufferDelegate("LONGBLOB", 4294967295);
//# sourceMappingURL=binary.js.map