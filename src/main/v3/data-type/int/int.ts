import * as sd from "schema-decorator";

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
        throw new Error(`Expected ${name} to be of type bigint, received ${sd.toTypeStr(raw)}`);
    },
);
function unsafeInt () {
    return unsafeIntDelegate;
}
unsafeInt.nullable = () => sd.nullable(unsafeInt());
function intDelegate (min : number, max : number) {
    return sd.chain(
        unsafeInt(),
        sd.gtEq(min),
        sd.ltEq(max)
    );
}
function tinyIntSigned () {
    return intDelegate(-128, 127);
}
tinyIntSigned.nullable = () => sd.nullable(tinyIntSigned());
function smallIntSigned () {
    return intDelegate(-32768, 32767);
}
smallIntSigned.nullable = () => sd.nullable(smallIntSigned());
function mediumIntSigned () {
    return intDelegate(-8388608, 8388607);
}
mediumIntSigned.nullable = () => sd.nullable(mediumIntSigned());
function intSigned () {
    return intDelegate(-2147483648, 2147483647);
}
intSigned.nullable = () => sd.nullable(intSigned());
function tinyIntUnsigned () {
    return intDelegate(0, 255);
}
tinyIntUnsigned.nullable = () => sd.nullable(tinyIntUnsigned());
function smallIntUnsigned () {
    return intDelegate(0, 65535);
}
smallIntUnsigned.nullable = () => sd.nullable(smallIntUnsigned());
function mediumIntUnsigned () {
    return intDelegate(0, 16777215);
}
mediumIntUnsigned.nullable = () => sd.nullable(mediumIntUnsigned());
function intUnsigned () {
    return intDelegate(0, 4294967295);
}
intUnsigned.nullable = () => sd.nullable(intUnsigned());
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