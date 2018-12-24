"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
//MAX ROW SIZE = 65,535
var DataType;
(function (DataType) {
    //CHAR(LENGTH : 0-255) COLLATION NAME
    //size = LENGTH * sizeof(COLLATION NAME)
    //JS = string
    //When stored, right-padded with spaces to fill LENGTH.
    //When retrieved, trailing spaces removed
    //unless PAD_CHAR_TO_FULL_LENGTH enabled.
    DataType["char"] = "char";
    //VARCHAR(LENGTH : 0-65,535) COLLATION NAME
    //1 byte prefix up to LENGTH 255
    //2 byte prefix after LENGTH 255
    //size = PREFIX + LENGTH sizeof(COLLATION NAME)
    //JS = string
    //When retrieved, trailing spaces are NOT removed!
    DataType["varchar"] = "varchar";
    //BINARY(LENGTH : 0-255)
    //COLLATION = binary
    //size = LENGTH
    //JS = Buffer
    //When stored, right-padded with 0x00 to fill LENGTH.
    //When retrieved, trailing spaces are NOT removed!
    DataType["binary"] = "binary";
    //VARBINARY(LENGTH : 0-65,535)
    //COLLATION = binary
    //1 byte prefix up to LENGTH 255
    //2 byte prefix after LENGTH 255
    //size = PREFIX + LENGTH
    //JS = Buffer
    DataType["varbinary"] = "varbinary";
    //TINYTEXT
    //MAX LENGTH = 255
    DataType["tinytext"] = "tinytext";
    //TEXT
    //MAX LENGTH = 65535
    DataType["text"] = "text";
    //MEDIUMTEXT
    //MAX LENGTH = 16777215
    DataType["mediumtext"] = "mediumtext";
    //LONGTEXT
    //MAX LENGTH = 4294967295
    DataType["longtext"] = "longtext";
    //TINYBLOB
    //MAX LENGTH = 255
    DataType["tinyblob"] = "tinyblob";
    //BLOB
    //MAX LENGTH = 65535
    DataType["blob"] = "blob";
    //MEDIUMBLOB
    //MAX LENGTH = 16777215
    DataType["mediumblob"] = "mediumblob";
    //LONGBLOB
    //MAX LENGTH = 4294967295
    DataType["longblob"] = "longblob";
    //JSON
    //MAX LENGTH = 4294967295
    DataType["json"] = "json";
    //TINYINT
    //SIGNED: [-128, 127]
    //UNSIGNED: [0, 255]
    //size = 1
    DataType["tinyint"] = "tinyint";
    //SMALLINT
    //SIGNED: [-32768, 32767]
    //UNSIGNED: [0, 65535]
    //size = 2
    DataType["smallint"] = "smallint";
    //MEDIUMINT
    //SIGNED: [-8388608, 8388607]
    //UNSIGNED: [0, 16777215]
    //size = 3
    DataType["mediumint"] = "mediumint";
    //INT
    //SIGNED: [-2147483648, 2147483647]
    //UNSIGNED: [0, 4294967295]
    //size = 4
    DataType["int"] = "int";
    //BIGINT
    //SIGNED: [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807]
    //UNSIGNED: [0, 18,446,744,073,709,551,616]
    //size = 8
    //WARNING: THIS IS LARGER THAN `Number.MAX_SAFE_INTEGER`
    //THIS *must* be a bigint!
    DataType["bigint"] = "bigint";
    //FLOAT
    //size = 4
    DataType["float"] = "float";
    //DOUBLE
    //size = 8
    DataType["double"] = "double";
    //DECIMAL(M, D)
    //M = total number of digits
    //D = number of decimal places
    //M <= 65
    //size = complicated
    DataType["decimal"] = "decimal";
    //BIT(M)
    //M = [1, 64]
    //Left-padded with zeroes
    DataType["bit"] = "bit";
    DataType["datetime"] = "datetime";
    /*
        Avoid this.
        TIMESTAMP has a range of
        '1970-01-01 00:00:01' UTC to
        '2038-01-19 03:14:07' UTC.

        Use DATETIME.
    */
    DataType["timestamp"] = "timestamp";
    DataType["date"] = "date";
    DataType["time"] = "time";
    //SET(e1, e2, e3, ...)
    //Each element cannot have commas
    DataType["set"] = "set";
    //ENUM(e1, e2, e3, ...)
    DataType["enum"] = "enum";
})(DataType = exports.DataType || (exports.DataType = {}));
function buildDataType(assert, methods) {
    const result = (name, raw) => {
        return assert(name, raw);
    };
    result.toSql = methods.toSql;
    result.dataType = methods.dataType;
    result.characterMaximumLength = methods.characterMaximumLength;
    result.numericPrecision = methods.numericPrecision;
    result.numericScale = methods.numericScale;
    result.dateTimePrecision = methods.dateTimePrecision;
    result.collationName = methods.collationName;
    result.columnType = methods.columnType;
    const nullable = () => {
        const result = (name, raw) => {
            if (raw === null) {
                return null;
            }
            return assert(name, raw);
        };
        result.toSql = (value) => {
            if (value === null) {
                return sqlstring_1.escape(null);
            }
            return methods.toSql(value);
        };
        result.dataType = methods.dataType;
        result.characterMaximumLength = methods.characterMaximumLength;
        result.numericPrecision = methods.numericPrecision;
        result.numericScale = methods.numericScale;
        result.dateTimePrecision = methods.dateTimePrecision;
        result.collationName = methods.collationName;
        result.columnType = methods.columnType;
        result.nullable = nullable;
        return result;
    };
    result.nullable = nullable;
    return result;
}
exports.buildDataType = buildDataType;
//# sourceMappingURL=data-type.js.map