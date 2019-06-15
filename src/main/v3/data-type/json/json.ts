import * as sd from "type-mapping";

export interface JsonDelegateNullable {
    (minLength : number, maxLength : number) : sd.SafeMapper<string|null>,
    (maxLength : number) : sd.SafeMapper<string|null>,
    () : sd.SafeMapper<string|null>,
}
export function jsonDelegate (
    dataTypeStr : string,
    absoluteMax : number,
    defaultSize : number,
) : {
    (minLength : number, maxLength : number) : sd.SafeMapper<string>,
    (maxLength : number) : sd.SafeMapper<string>,
    () : sd.SafeMapper<string>,

    nullable : JsonDelegateNullable,
} {
    const result =(a? : number, b? : number) => {
        if (a == undefined) {
            return sd.mysql.json(defaultSize);
        } else if (b == undefined) {
            a = sd.pipe(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", a);
            return sd.mysql.json(a);
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
            return sd.mysql.json(a, b);
        }
    }
    result.nullable = (a? : number, b? : number) => {
        return sd.orNull(result(a, b));
    };
    return result;
}

/*
    he space required to store a JSON document is roughly
    the same as for LONGBLOB or LONGTEXT.

    In addition, MySQL imposes a limit on the size of any JSON
    document stored in a JSON column such that it cannot be any
    larger than the value of max_allowed_packet.

    The default for max_allowed_packet is 4194304, 4MB.

    The maximum is 1073741824, 1GB.

    The value should be a multiple of 1024;
    nonmultiples are rounded down to the nearest multiple.

    -----

    I set the default to 1MB arbitrarily.
*/
export const json = jsonDelegate("JSON", 4294967295, 1048576);