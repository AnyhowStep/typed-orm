import { Collation } from "./collation";
export declare enum DataType {
    char = "char",
    varchar = "varchar",
    binary = "binary",
    varbinary = "varbinary",
    tinytext = "tinytext",
    text = "text",
    mediumtext = "mediumtext",
    longtext = "longtext",
    tinyblob = "tinyblob",
    blob = "blob",
    mediumblob = "mediumblob",
    longblob = "longblob",
    json = "json",
    tinyint = "tinyint",
    smallint = "smallint",
    mediumint = "mediumint",
    int = "int",
    bigint = "bigint",
    float = "float",
    double = "double",
    decimal = "decimal",
    bit = "bit",
    datetime = "datetime",
    timestamp = "timestamp",
    date = "date",
    time = "time",
    set = "set",
    enum = "enum"
}
export interface IDataType<TypeT> {
    (name: string, raw: unknown): TypeT;
    toSql(value: TypeT): string;
    readonly dataType: DataType;
    readonly characterMaximumLength: null | bigint;
    readonly numericPrecision: null | bigint;
    readonly numericScale: null | bigint;
    readonly dateTimePrecision: null | 0 | 1 | 2 | 3 | 4 | 5 | 6;
    readonly collationName: null | Collation;
    readonly columnType: string;
    readonly nullable: () => IDataType<TypeT | null>;
}
export declare function buildDataType<TypeT>(assert: (name: string, raw: unknown) => TypeT, methods: {
    toSql: (value: TypeT) => string;
    readonly dataType: DataType;
    readonly characterMaximumLength: null | bigint;
    readonly numericPrecision: null | bigint;
    readonly numericScale: null | bigint;
    readonly dateTimePrecision: null | 0 | 1 | 2 | 3 | 4 | 5 | 6;
    readonly collationName: null | Collation;
    readonly columnType: string;
}): (IDataType<TypeT>);
//# sourceMappingURL=data-type.d.ts.map