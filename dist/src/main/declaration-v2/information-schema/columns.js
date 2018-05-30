"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../table");
const sd = require("schema-decorator");
const table_2 = require("../table");
const column_1 = require("../column");
table_2.Table;
column_1.Column;
exports.COLUMNS = table_1.table("COLUMNS", {
    TABLE_CATALOG: sd.varChar(512),
    TABLE_SCHEMA: sd.varChar(64),
    TABLE_NAME: sd.varChar(64),
    COLUMN_NAME: sd.varChar(64),
    ORDINAL_POSITION: sd.stringToNaturalNumber(),
    COLUMN_DEFAULT: sd.nullable(sd.string()),
    IS_NULLABLE: sd.or(sd.oneOf("YES", "NO"), sd.varChar(3)),
    DATA_TYPE: sd.varChar(64),
    CHARACTER_MAXIMUM_LENGTH: sd.nullable(sd.stringToNaturalNumber()),
    CHARACTER_OCTET_LENGTH: sd.nullable(sd.stringToNaturalNumber()),
    NUMERIC_PRECISION: sd.nullable(sd.stringToNaturalNumber()),
    NUMERIC_SCALE: sd.nullable(sd.stringToNaturalNumber()),
    DATETIME_PRECISION: sd.nullable(sd.stringToNaturalNumber()),
    CHARACTER_SET_NAME: sd.nullable(sd.varChar(32)),
    COLLATION_NAME: sd.nullable(sd.varChar(32)),
    COLUMN_TYPE: sd.string(),
    COLUMN_KEY: sd.varChar(3),
    EXTRA: sd.varChar(30),
    PRIVILEGES: sd.varChar(80),
    COLUMN_COMMENT: sd.varChar(1024),
    GENERATION_EXPRESSION: sd.string(),
})
    .setHasDefaultValue(c => [
    c.TABLE_CATALOG,
    c.TABLE_SCHEMA,
    c.TABLE_NAME,
    c.COLUMN_NAME,
    c.ORDINAL_POSITION,
    c.IS_NULLABLE,
    c.DATA_TYPE,
    c.COLUMN_KEY,
    c.EXTRA,
    c.PRIVILEGES,
    c.COLUMN_COMMENT,
    c.GENERATION_EXPRESSION
])
    .setImmutable()
    .build()
    .setHackedDatabaseName("information_schema");
//# sourceMappingURL=columns.js.map