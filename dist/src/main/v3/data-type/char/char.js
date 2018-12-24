"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const data_type_1 = require("../data-type");
const sqlstring_1 = require("sqlstring");
function char(
//[1,255]
characterMaximumLength, collation, assert = ((_name, str) => str)) {
    characterMaximumLength = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(255))("length", characterMaximumLength);
    return data_type_1.buildDataType(sd.chain(sd.varChar(0, characterMaximumLength), assert), {
        toSql: (value) => {
            return sqlstring_1.escape(value);
        },
        dataType: data_type_1.DataType.char,
        characterMaximumLength: BigInt(characterMaximumLength),
        numericPrecision: null,
        numericScale: null,
        dateTimePrecision: null,
        collationName: collation,
        columnType: `char(128)`,
    });
}
exports.char = char;
//# sourceMappingURL=char.js.map