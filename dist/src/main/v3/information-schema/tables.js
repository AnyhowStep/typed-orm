"use strict";
const sd = require("type-mapping");
const table_1 = require("../table");
const type_1 = require("../type");
const dataType = require("../data-type");
const x = type_1.lazyInit("TABLES", () => table_1.table("TABLES", {
    TABLE_CATALOG: sd.mysql.varChar(512),
    TABLE_SCHEMA: sd.mysql.varChar(64),
    TABLE_NAME: sd.mysql.varChar(64),
    TABLE_TYPE: sd.mysql.varChar(64),
    ENGINE: sd.orNull(sd.mysql.varChar(64)),
    VERSION: sd.orNull(dataType.bigint()),
    ROW_FORMAT: sd.orNull(sd.mysql.varChar(10)),
    TABLE_ROWS: sd.orNull(dataType.bigint()),
    AVG_ROW_LENGTH: sd.orNull(dataType.bigint()),
    DATA_LENGTH: sd.orNull(dataType.bigint()),
    MAX_DATA_LENGTH: sd.orNull(dataType.bigint()),
    INDEX_LENGTH: sd.orNull(dataType.bigint()),
    DATA_FREE: sd.orNull(dataType.bigint()),
    AUTO_INCREMENT: sd.orNull(dataType.bigint()),
    CREATE_TIME: sd.orNull(sd.mysql.dateTime()),
    UPDATE_TIME: sd.orNull(sd.mysql.dateTime()),
    CHECK_TIME: sd.orNull(sd.mysql.dateTime()),
    TABLE_COLLATION: sd.orNull(sd.mysql.varChar(32)),
    CHECKSUM: sd.orNull(dataType.bigint()),
    CREATE_OPTIONS: sd.orNull(sd.mysql.varChar(255)),
    TABLE_COMMENT: sd.mysql.varChar(2048),
})
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema"));
module.exports = x;
//# sourceMappingURL=tables.js.map