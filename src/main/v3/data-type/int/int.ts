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
export function unsafeInt () {
    return unsafeIntDelegate;
}
function intDelegate (min : number, max : number) {
    return sd.chain(
        unsafeInt(),
        sd.gtEq(min),
        sd.ltEq(max)
    );
}
export function tinyIntSigned () {
    return intDelegate(-128, 127);
}
export function smallIntSigned () {
    return intDelegate(-32768, 32767);
}
export function mediumIntSigned () {
    return intDelegate(-8388608, 8388607);
}
export function intSigned () {
    return intDelegate(-2147483648, 2147483647);
}
export function tinyIntUnsigned () {
    return intDelegate(0, 255);
}
export function smallIntUnsigned () {
    return intDelegate(0, 65535);
}
export function mediumIntUnsigned () {
    return intDelegate(0, 16777215);
}
export function intUnsigned () {
    return intDelegate(0, 4294967295);
}