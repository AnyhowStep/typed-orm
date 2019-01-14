import * as sd from "schema-decorator";

export interface StrDelegateNullable {
    (minLength : number, maxLength : number) : sd.AssertDelegate<string|null>,
    (maxLength : number) : sd.AssertDelegate<string|null>,
    () : sd.AssertDelegate<string|null>,
}
export function strDelegate (
    dataTypeStr : string,
    absoluteMax : number,
) : {
    (minLength : number, maxLength : number) : sd.AssertDelegate<string>,
    (maxLength : number) : sd.AssertDelegate<string>,
    () : sd.AssertDelegate<string>,

    nullable : StrDelegateNullable,
} {
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return sd.varChar(absoluteMax);
        } else if (b == undefined) {
            a = sd.chain(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", a);
            return sd.varChar(a);
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
            return sd.varChar(a, b);
        }
    }
    result.nullable = (a? : number, b? : number) => {
        return sd.nullable(result(a, b));
    };
    return result;
}
export const char = strDelegate("CHAR", 255);
export const varChar = strDelegate("VARCHAR", 65535);
export const tinyText = strDelegate("TINYTEXT", 255);
export const text = strDelegate("TEXT", 65535);
export const mediumText = strDelegate("MEDIUMTEXT", 16777215);
export const longText = strDelegate("LONGTEXT", 4294967295);

/*import * as sd from "schema-decorator";
import {DataType, IDataType, buildDataType} from "../data-type";
import {Collation} from "../collation";
import {escape} from "sqlstring";

export function char (
    //[1,255]
    characterMaximumLength : number,
    collation : Collation,
    assert : ((name : string, str : string) => string) = ((_name : string, str : string) => str)
) : IDataType<string> {
    characterMaximumLength = sd.chain(
        sd.integer(),
        sd.gtEq(1),
        sd.ltEq(255)
    )("length", characterMaximumLength);

    return buildDataType(
        sd.chain(
            sd.varChar(0, characterMaximumLength),
            assert
        ),
        {
            toSql : (value) => {
                return escape(value);
            },
            dataType : DataType.char,
            characterMaximumLength : BigInt(characterMaximumLength),
            numericPrecision : null,
            numericScale : null,
            dateTimePrecision : null,
            collationName : collation,
            columnType : `char(${characterMaximumLength})`,
        }
    );
}*/