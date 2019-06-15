"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const unsafeIntDelegate = sd.or(sd.stringToInteger(), (name, raw) => {
    if (typeof raw == "bigint") {
        const result = Number(raw);
        if (BigInt(result) !== raw) {
            throw new Error(`${name} bigint value is too large, or too small`);
        }
        else {
            return result;
        }
    }
    throw new Error(`Expected ${name} to be of type bigint, received ${sd.TypeUtil.toTypeStr(raw)}`);
});
function unsafeInt() {
    return unsafeIntDelegate;
}
exports.unsafeInt = unsafeInt;
unsafeInt.nullable = () => sd.orNull(unsafeInt());
function intDelegate(min, max) {
    return sd.pipe(unsafeInt(), sd.gtEq(min), sd.ltEq(max));
}
function tinyIntSigned() {
    return intDelegate(-128, 127);
}
exports.tinyIntSigned = tinyIntSigned;
tinyIntSigned.nullable = () => sd.orNull(tinyIntSigned());
function smallIntSigned() {
    return intDelegate(-32768, 32767);
}
exports.smallIntSigned = smallIntSigned;
smallIntSigned.nullable = () => sd.orNull(smallIntSigned());
function mediumIntSigned() {
    return intDelegate(-8388608, 8388607);
}
exports.mediumIntSigned = mediumIntSigned;
mediumIntSigned.nullable = () => sd.orNull(mediumIntSigned());
function intSigned() {
    return intDelegate(-2147483648, 2147483647);
}
exports.intSigned = intSigned;
intSigned.nullable = () => sd.orNull(intSigned());
function tinyIntUnsigned() {
    return intDelegate(0, 255);
}
exports.tinyIntUnsigned = tinyIntUnsigned;
tinyIntUnsigned.nullable = () => sd.orNull(tinyIntUnsigned());
function smallIntUnsigned() {
    return intDelegate(0, 65535);
}
exports.smallIntUnsigned = smallIntUnsigned;
smallIntUnsigned.nullable = () => sd.orNull(smallIntUnsigned());
function mediumIntUnsigned() {
    return intDelegate(0, 16777215);
}
exports.mediumIntUnsigned = mediumIntUnsigned;
mediumIntUnsigned.nullable = () => sd.orNull(mediumIntUnsigned());
function intUnsigned() {
    return intDelegate(0, 4294967295);
}
exports.intUnsigned = intUnsigned;
intUnsigned.nullable = () => sd.orNull(intUnsigned());
//# sourceMappingURL=int.js.map