"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function strDelegate(dataTypeStr, absoluteMax) {
    return (a, b) => {
        if (a == undefined) {
            return sd.varChar(absoluteMax);
        }
        else if (b == undefined) {
            a = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", a);
            return sd.varChar(a);
        }
        else {
            a = sd.chain(sd.integer(), sd.gtEq(0), sd.ltEq(absoluteMax))("minLength", a);
            b = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.varChar(a, b);
        }
    };
}
exports.strDelegate = strDelegate;
exports.char = strDelegate("CHAR", 255);
exports.varChar = strDelegate("VARCHAR", 65535);
exports.tinyText = strDelegate("TINYTEXT", 255);
exports.text = strDelegate("TEXT", 65535);
exports.mediumText = strDelegate("MEDIUMTEXT", 16777215);
exports.longText = strDelegate("LONGTEXT", 4294967295);
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
//# sourceMappingURL=char.js.map