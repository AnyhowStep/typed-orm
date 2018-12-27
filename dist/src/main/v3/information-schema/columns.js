"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const table_1 = require("../table");
exports.COLUMNS = table_1.table("COLUMNS", {
    TABLE_CATALOG: sd.varChar(512),
    TABLE_SCHEMA: sd.varChar(64),
    TABLE_NAME: sd.varChar(64),
    COLUMN_NAME: sd.varChar(64),
    ORDINAL_POSITION: sd.stringToNaturalNumber(),
    COLUMN_DEFAULT: sd.nullable(sd.string()),
    IS_NULLABLE: sd.or(sd.literal("YES", "NO"), sd.varChar(3)),
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
    EXTRA: sd.or(sd.literal("auto_increment", "STORED GENERATED"), sd.varChar(30)),
    PRIVILEGES: sd.varChar(80),
    COLUMN_COMMENT: sd.varChar(1024),
    //Seems to be an empty string when there is no generation expression
    GENERATION_EXPRESSION: sd.string(),
})
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema");
//# sourceMappingURL=columns.js.map