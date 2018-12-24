import {Collation} from "./collation";
import {escape} from "sqlstring";

//MAX ROW SIZE = 65,535
export enum DataType {
    //CHAR(LENGTH : 0-255) COLLATION NAME
    //size = LENGTH * sizeof(COLLATION NAME)
    //JS = string
    //When stored, right-padded with spaces to fill LENGTH.
    //When retrieved, trailing spaces removed
    //unless PAD_CHAR_TO_FULL_LENGTH enabled.
    char = "char",
    //VARCHAR(LENGTH : 0-65,535) COLLATION NAME
    //1 byte prefix up to LENGTH 255
    //2 byte prefix after LENGTH 255
    //size = PREFIX + LENGTH sizeof(COLLATION NAME)
    //JS = string
    //When retrieved, trailing spaces are NOT removed!
    varchar = "varchar",

    //BINARY(LENGTH : 0-255)
    //COLLATION = binary
    //size = LENGTH
    //JS = Buffer
    //When stored, right-padded with 0x00 to fill LENGTH.
    //When retrieved, trailing spaces are NOT removed!
    binary = "binary",
    //VARBINARY(LENGTH : 0-65,535)
    //COLLATION = binary
    //1 byte prefix up to LENGTH 255
    //2 byte prefix after LENGTH 255
    //size = PREFIX + LENGTH
    //JS = Buffer
    varbinary = "varbinary",

    //TINYTEXT
    //MAX LENGTH = 255
    tinytext = "tinytext",
    //TEXT
    //MAX LENGTH = 65535
    text = "text",
    //MEDIUMTEXT
    //MAX LENGTH = 16777215
    mediumtext = "mediumtext",
    //LONGTEXT
    //MAX LENGTH = 4294967295
    longtext = "longtext",

    //TINYBLOB
    //MAX LENGTH = 255
    tinyblob = "tinyblob",
    //BLOB
    //MAX LENGTH = 65535
    blob = "blob",
    //MEDIUMBLOB
    //MAX LENGTH = 16777215
    mediumblob = "mediumblob",
    //LONGBLOB
    //MAX LENGTH = 4294967295
    longblob = "longblob",

    //JSON
    //MAX LENGTH = 4294967295
    json = "json",

    //TINYINT
    //SIGNED: [-128, 127]
    //UNSIGNED: [0, 255]
    //size = 1
    tinyint = "tinyint",
    //SMALLINT
    //SIGNED: [-32768, 32767]
    //UNSIGNED: [0, 65535]
    //size = 2
    smallint = "smallint",
    //MEDIUMINT
    //SIGNED: [-8388608, 8388607]
    //UNSIGNED: [0, 16777215]
    //size = 3
    mediumint = "mediumint",
    //INT
    //SIGNED: [-2147483648, 2147483647]
    //UNSIGNED: [0, 4294967295]
    //size = 4
    int = "int",
    //BIGINT
    //SIGNED: [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807]
    //UNSIGNED: [0, 18,446,744,073,709,551,616]
    //size = 8
    //WARNING: THIS IS LARGER THAN `Number.MAX_SAFE_INTEGER`
    //THIS *must* be a bigint!
    bigint = "bigint",

    //FLOAT
    //size = 4
    float = "float",
    //DOUBLE
    //size = 8
    double = "double",
    //DECIMAL(M, D)
    //M = total number of digits
    //D = number of decimal places
    //M <= 65
    //size = complicated
    decimal = "decimal",

    //BIT(M)
    //M = [1, 64]
    //Left-padded with zeroes
    bit = "bit",

    datetime = "datetime",
    /*
        Avoid this.
        TIMESTAMP has a range of
        '1970-01-01 00:00:01' UTC to
        '2038-01-19 03:14:07' UTC.

        Use DATETIME.
    */
    timestamp = "timestamp",
    date = "date",
    time = "time",

    //SET(e1, e2, e3, ...)
    //Each element cannot have commas
    set = "set",
    //ENUM(e1, e2, e3, ...)
    enum = "enum",
}

export interface IDataType<TypeT> {
    (name : string, raw : unknown) : TypeT;
    toSql (value : TypeT) : string;

    readonly dataType : DataType;
    readonly characterMaximumLength : null|bigint;
    readonly numericPrecision : null|bigint;
    readonly numericScale : null|bigint;
    readonly dateTimePrecision : null|0|1|2|3|4|5|6;
    readonly collationName : null|Collation;
    readonly columnType : string;
    readonly nullable : () => IDataType<TypeT|null>;
}
export function buildDataType<TypeT> (
    assert : (name : string, raw : unknown) => TypeT,
    methods : {
        toSql : (value : TypeT) => string;

        readonly dataType : DataType;
        readonly characterMaximumLength : null|bigint;
        readonly numericPrecision : null|bigint;
        readonly numericScale : null|bigint;
        readonly dateTimePrecision : null|0|1|2|3|4|5|6;
        readonly collationName : null|Collation;
        readonly columnType : string;
    }
) : (
    IDataType<TypeT>
){
    const result = (name : string, raw : unknown) => {
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
    const nullable : (() => IDataType<TypeT|null>) = () => {
        const result = (name : string, raw : unknown) => {
            if (raw === null) {
                return null;
            }
            return assert(name, raw);
        };
        result.toSql = (value : any) => {
            if (value === null) {
                return escape(null);
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