"use strict";
const sd = require("type-mapping");
const table_1 = require("../table");
const type_1 = require("../type");
const x = type_1.lazyInit("KEY_COLUMN_USAGE", () => table_1.table("KEY_COLUMN_USAGE", {
    CONSTRAINT_CATALOG: sd.mysql.varChar(512),
    CONSTRAINT_SCHEMA: sd.mysql.varChar(64),
    CONSTRAINT_NAME: sd.mysql.varChar(64),
    TABLE_CATALOG: sd.mysql.varChar(512),
    TABLE_SCHEMA: sd.mysql.varChar(64),
    TABLE_NAME: sd.mysql.varChar(64),
    COLUMN_NAME: sd.mysql.varChar(64),
    ORDINAL_POSITION: sd.stringToUnsignedInteger(),
    POSITION_IN_UNIQUE_CONSTRAINT: sd.orNull(sd.stringToUnsignedInteger()),
    REFERENCED_TABLE_SCHEMA: sd.orNull(sd.mysql.varChar(64)),
    REFERENCED_TABLE_NAME: sd.orNull(sd.mysql.varChar(64)),
    REFERENCED_COLUMN_NAME: sd.orNull(sd.mysql.varChar(64)),
})
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema"));
module.exports = x;
//# sourceMappingURL=key-column-usage.js.map