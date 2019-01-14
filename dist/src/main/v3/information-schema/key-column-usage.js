"use strict";
const sd = require("schema-decorator");
const table_1 = require("../table");
const type_1 = require("../type");
const x = type_1.lazyInit("KEY_COLUMN_USAGE", () => table_1.table("KEY_COLUMN_USAGE", {
    CONSTRAINT_CATALOG: sd.varChar(512),
    CONSTRAINT_SCHEMA: sd.varChar(64),
    CONSTRAINT_NAME: sd.varChar(64),
    TABLE_CATALOG: sd.varChar(512),
    TABLE_SCHEMA: sd.varChar(64),
    TABLE_NAME: sd.varChar(64),
    COLUMN_NAME: sd.varChar(64),
    ORDINAL_POSITION: sd.stringToNaturalNumber(),
    POSITION_IN_UNIQUE_CONSTRAINT: sd.nullable(sd.stringToNaturalNumber()),
    REFERENCED_TABLE_SCHEMA: sd.nullable(sd.varChar(64)),
    REFERENCED_TABLE_NAME: sd.nullable(sd.varChar(64)),
    REFERENCED_COLUMN_NAME: sd.nullable(sd.varChar(64)),
})
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema"));
module.exports = x;
//# sourceMappingURL=key-column-usage.js.map