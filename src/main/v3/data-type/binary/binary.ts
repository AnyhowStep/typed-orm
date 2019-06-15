import * as sd from "type-mapping";

export interface BufferDelegateNullable {
    (minLength : number, maxLength : number) : sd.SafeMapper<Buffer|null>,
    (maxLength : number) : sd.SafeMapper<Buffer|null>,
    () : sd.SafeMapper<Buffer|null>,
}
export function bufferDelegate (
    dataTypeStr : string,
    absoluteMax : number,
) : {
    (minLength : number, maxLength : number) : sd.SafeMapper<Buffer>,
    (maxLength : number) : sd.SafeMapper<Buffer>,
    () : sd.SafeMapper<Buffer>,

    nullable : BufferDelegateNullable,
} {
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return sd.bufferLength({
                max : absoluteMax,
            });
        } else if (b == undefined) {
            a = sd.pipe(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", a);
            return sd.bufferLength({
                max : a,
            });
        } else {
            a = sd.pipe(
                sd.integer(),
                sd.gtEq(0),
                sd.ltEq(absoluteMax)
            )("minLength", a);
            b = sd.pipe(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.bufferLength({
                min : a,
                max : b,
            });
        }
    }
    result.nullable = (a? : number, b? : number) => {
        return sd.orNull(result(a, b));
    };
    return result;
}
export const binary = bufferDelegate("BINARY", 255);
export const varBinary = bufferDelegate("VARBINARY", 65535);
export const tinyBlob = bufferDelegate("TINYBLOB", 255);
export const blob = bufferDelegate("BLOB", 65535);
export const mediumBlob = bufferDelegate("MEDIUMBLOB", 16777215);
export const longBlob = bufferDelegate("LONGBLOB", 4294967295);