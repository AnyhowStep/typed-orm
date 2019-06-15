import * as sd from "type-mapping";

const unsafeIntDelegate = sd.or(
    sd.stringToInteger(),
    (name : string, raw : unknown) : number => {
        if (typeof raw == "bigint") {
            const result = Number(raw);
            if (BigInt(result) !== raw) {
                throw new Error(`${name} bigint value is too large, or too small`);
            } else {
                return result;
            }
        }
        throw new Error(`Expected ${name} to be of type bigint, received ${sd.TypeUtil.toTypeStr(raw)}`);
    },
);
function unsafeInt () {
    return unsafeIntDelegate;
}
unsafeInt.nullable = () => sd.orNull(unsafeInt());
function intDelegate (min : number, max : number) {
    return sd.pipe(
        unsafeInt(),
        sd.gtEq(min),
        sd.ltEq(max)
    );
}
function tinyIntSigned () {
    return intDelegate(-128, 127);
}
tinyIntSigned.nullable = () => sd.orNull(tinyIntSigned());
function smallIntSigned () {
    return intDelegate(-32768, 32767);
}
smallIntSigned.nullable = () => sd.orNull(smallIntSigned());
function mediumIntSigned () {
    return intDelegate(-8388608, 8388607);
}
mediumIntSigned.nullable = () => sd.orNull(mediumIntSigned());
function intSigned () {
    return intDelegate(-2147483648, 2147483647);
}
intSigned.nullable = () => sd.orNull(intSigned());
function tinyIntUnsigned () {
    return intDelegate(0, 255);
}
tinyIntUnsigned.nullable = () => sd.orNull(tinyIntUnsigned());
function smallIntUnsigned () {
    return intDelegate(0, 65535);
}
smallIntUnsigned.nullable = () => sd.orNull(smallIntUnsigned());
function mediumIntUnsigned () {
    return intDelegate(0, 16777215);
}
mediumIntUnsigned.nullable = () => sd.orNull(mediumIntUnsigned());
function intUnsigned () {
    return intDelegate(0, 4294967295);
}
intUnsigned.nullable = () => sd.orNull(intUnsigned());
export {
    unsafeInt,

    tinyIntSigned,
    smallIntSigned,
    mediumIntSigned,
    intSigned,

    tinyIntUnsigned,
    smallIntUnsigned,
    mediumIntUnsigned,
    intUnsigned,
}