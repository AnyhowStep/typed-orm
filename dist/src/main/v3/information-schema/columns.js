"use strict";
const sd = require("type-mapping");
const table_1 = require("../table");
const type_1 = require("../type");
const dataType = require("../data-type");
const x = type_1.lazyInit("COLUMNS", () => table_1.table("COLUMNS", {
    TABLE_CATALOG: sd.mysql.varChar(512),
    TABLE_SCHEMA: sd.mysql.varChar(64),
    TABLE_NAME: sd.mysql.varChar(64),
    COLUMN_NAME: sd.mysql.varChar(64),
    ORDINAL_POSITION: sd.stringToUnsignedInteger(),
    COLUMN_DEFAULT: sd.orNull(sd.string()),
    IS_NULLABLE: sd.or(sd.literal("YES", "NO"), sd.mysql.varChar(3)),
    DATA_TYPE: sd.mysql.varChar(64),
    CHARACTER_MAXIMUM_LENGTH: sd.orNull(dataType.bigint()),
    CHARACTER_OCTET_LENGTH: sd.orNull(dataType.bigint()),
    NUMERIC_PRECISION: sd.orNull(sd.stringToUnsignedInteger()),
    NUMERIC_SCALE: sd.orNull(sd.stringToUnsignedInteger()),
    DATETIME_PRECISION: sd.orNull(sd.stringToUnsignedInteger()),
    CHARACTER_SET_NAME: sd.orNull(sd.mysql.varChar(32)),
    COLLATION_NAME: sd.orNull(sd.mysql.varChar(32)),
    COLUMN_TYPE: sd.string(),
    COLUMN_KEY: sd.mysql.varChar(3),
    EXTRA: sd.or(sd.literal("auto_increment", "STORED GENERATED"), sd.mysql.varChar(30)),
    PRIVILEGES: sd.mysql.varChar(80),
    COLUMN_COMMENT: sd.mysql.varChar(1024),
    //Seems to be an empty string when there is no generation expression
    GENERATION_EXPRESSION: sd.string(),
})
    .addCandidateKey(c => [
    c.TABLE_SCHEMA,
    c.TABLE_NAME,
    c.COLUMN_NAME,
])
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema"));
module.exports = x;
//# sourceMappingURL=columns.js.map