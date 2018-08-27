"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../table");
const sd = require("schema-decorator");
const table_2 = require("../table");
const column_1 = require("../column");
table_2.Table;
column_1.Column;
exports.STATISTICS = table_1.table("STATISTICS", {
    TABLE_CATALOG: sd.varChar(512),
    TABLE_SCHEMA: sd.varChar(64),
    TABLE_NAME: sd.varChar(64),
    NON_UNIQUE: sd.numberToBoolean(),
    INDEX_SCHEMA: sd.varChar(64),
    INDEX_NAME: sd.varChar(64),
    SEQ_IN_INDEX: sd.stringToNaturalNumber(),
    COLUMN_NAME: sd.varChar(64),
    COLLATION: sd.nullable(sd.varChar(1)),
    CARDINALITY: sd.nullable(sd.naturalNumberString()),
    SUB_PART: sd.nullable(sd.stringToNaturalNumber()),
    PACKED: sd.nullable(sd.varChar(10)),
    NULLABLE: sd.or(sd.literal("YES", "NO"), sd.varChar(3)),
    INDEX_TYPE: sd.or(sd.literal("BTREE"), sd.varChar(16)),
    COMMENT: sd.nullable(sd.varChar(16)),
    INDEX_COMMENT: sd.varChar(1024),
})
    //HACK We make them generated so we cannot insert into the table
    .setIsGenerated(c => [
    c.TABLE_CATALOG,
    c.TABLE_SCHEMA,
    c.TABLE_NAME,
    c.NON_UNIQUE,
    c.INDEX_SCHEMA,
    c.INDEX_NAME,
    c.SEQ_IN_INDEX,
    c.COLUMN_NAME,
    c.COLLATION,
    c.CARDINALITY,
    c.SUB_PART,
    c.PACKED,
    c.NULLABLE,
    c.INDEX_TYPE,
    c.COMMENT,
    c.INDEX_COMMENT,
])
    .setImmutable()
    .build()
    .setHackedDatabaseName("information_schema");
//# sourceMappingURL=statistics.js.map