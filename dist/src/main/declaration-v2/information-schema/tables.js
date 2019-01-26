"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../table");
const sd = require("schema-decorator");
const table_2 = require("../table");
const column_1 = require("../column");
table_2.Table;
column_1.Column;
exports.TABLES = table_1.table("TABLES", {
    TABLE_CATALOG: sd.varChar(512),
    TABLE_SCHEMA: sd.varChar(64),
    TABLE_NAME: sd.varChar(64),
    TABLE_TYPE: sd.varChar(64),
    ENGINE: sd.nullable(sd.varChar(64)),
    VERSION: sd.nullable(sd.stringToNaturalNumber()),
    ROW_FORMAT: sd.nullable(sd.varChar(10)),
    TABLE_ROWS: sd.nullable(sd.stringToNaturalNumber()),
    AVG_ROW_LENGTH: sd.nullable(sd.stringToNaturalNumber()),
    DATA_LENGTH: sd.nullable(sd.stringToNaturalNumber()),
    MAX_DATA_LENGTH: sd.nullable(sd.stringToNaturalNumber()),
    INDEX_LENGTH: sd.nullable(sd.stringToNaturalNumber()),
    DATA_FREE: sd.nullable(sd.stringToNaturalNumber()),
    AUTO_INCREMENT: sd.nullable(sd.stringToNaturalNumber()),
    CREATE_TIME: sd.nullable(sd.dateTime()),
    UPDATE_TIME: sd.nullable(sd.dateTime()),
    CHECK_TIME: sd.nullable(sd.dateTime()),
    TABLE_COLLATION: sd.nullable(sd.varChar(32)),
    CHECKSUM: sd.nullable(sd.stringToNaturalNumber()),
    CREATE_OPTIONS: sd.nullable(sd.varChar(255)),
    TABLE_COMMENT: sd.varChar(2048),
})
    //HACK We make them generated so we cannot insert into the table
    .setIsGenerated(c => [
    c.TABLE_CATALOG,
    c.TABLE_SCHEMA,
    c.TABLE_NAME,
    c.TABLE_TYPE,
    c.ENGINE,
    c.VERSION,
    c.ROW_FORMAT,
    c.TABLE_ROWS,
    c.AVG_ROW_LENGTH,
    c.DATA_LENGTH,
    c.MAX_DATA_LENGTH,
    c.INDEX_LENGTH,
    c.DATA_FREE,
    c.AUTO_INCREMENT,
    c.CREATE_TIME,
    c.UPDATE_TIME,
    c.CHECK_TIME,
    c.TABLE_COLLATION,
    c.CHECKSUM,
    c.CREATE_OPTIONS,
    c.TABLE_COMMENT,
])
    .setImmutable()
    .build()
    .setHackedDatabaseName("information_schema");
//# sourceMappingURL=tables.js.map