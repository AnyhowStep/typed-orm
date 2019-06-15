import * as sd from "type-mapping";
import {table} from "../table";
import {lazyInit} from "../type";
import * as dataType from "../data-type";

const x = lazyInit(
    "STATISTICS",
    () => table(
        "STATISTICS",
        {
            TABLE_CATALOG : sd.mysql.varChar(512),
            TABLE_SCHEMA : sd.mysql.varChar(64),
            TABLE_NAME : sd.mysql.varChar(64),
            NON_UNIQUE : sd.finiteNumberToBoolean(),
            INDEX_SCHEMA : sd.mysql.varChar(64),
            INDEX_NAME : sd.mysql.varChar(64),
            SEQ_IN_INDEX : sd.stringToUnsignedInteger(),
            COLUMN_NAME : sd.mysql.varChar(64),
            COLLATION : sd.orNull(sd.mysql.varChar(1)),
            CARDINALITY : sd.orNull(dataType.bigint()),
            SUB_PART : sd.orNull(sd.stringToUnsignedInteger()),
            PACKED : sd.orNull(sd.mysql.varChar(10)),
            NULLABLE : sd.or(
                sd.literal("YES", "NO"),
                sd.mysql.varChar(3)
            ),
            INDEX_TYPE : sd.or(
                sd.literal("BTREE"),
                sd.mysql.varChar(16)
            ),
            COMMENT : sd.orNull(sd.mysql.varChar(16)),
            INDEX_COMMENT : sd.mysql.varChar(1024),
        }
    )
        .disallowInsert()
        .disallowDelete()
        .setImmutable()
        .setDatabaseName("information_schema")
);
export = x;