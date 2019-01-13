import * as sd from "schema-decorator";

export function bufferDelegate (
    dataTypeStr : string,
    absoluteMax : number,
) : {
    (minLength : number, maxLength : number) : sd.AssertDelegate<Buffer>,
    (maxLength : number) : sd.AssertDelegate<Buffer>,
    () : sd.AssertDelegate<Buffer>,
} {
    return (a? : number, b? : number) => {
        if (a == undefined) {
            return sd.bufferLength(absoluteMax);
        } else if (b == undefined) {
            a = sd.chain(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", a);
            return sd.bufferLength(a);
        } else {
            a = sd.chain(
                sd.integer(),
                sd.gtEq(0),
                sd.ltEq(absoluteMax)
            )("minLength", a);
            b = sd.chain(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.bufferLength(a, b);
        }
    }
}
export const binary = bufferDelegate("BINARY", 255);
export const varBinary = bufferDelegate("VARBINARY", 65535);
export const tinyBlob = bufferDelegate("TINYBLOB", 255);
export const blob = bufferDelegate("BLOB", 65535);
export const mediumBlob = bufferDelegate("MEDIUMBLOB", 16777215);
export const longBlob = bufferDelegate("LONGBLOB", 4294967295);