import {table} from "../table";
import * as sd from "schema-decorator";

import {Table} from "../table";
import {Column} from "../column";
Table;
Column;

export const STATISTICS = table(
    "STATISTICS",
    {
        TABLE_CATALOG : sd.varChar(512),
        TABLE_SCHEMA : sd.varChar(64),
        TABLE_NAME : sd.varChar(64),
        NON_UNIQUE : sd.numberToBoolean(),
        INDEX_SCHEMA : sd.varChar(64),
        INDEX_NAME : sd.varChar(64),
        SEQ_IN_INDEX : sd.stringToNaturalNumber(),
        COLUMN_NAME : sd.varChar(64),
        COLLATION : sd.nullable(sd.varChar(1)),
        CARDINALITY : sd.nullable(sd.naturalNumberString()),
        SUB_PART : sd.nullable(sd.stringToNaturalNumber()),
        PACKED : sd.nullable(sd.varChar(10)),
        NULLABLE : sd.or(
            sd.literal("YES", "NO"),
            sd.varChar(3)
        ),
        INDEX_TYPE : sd.or(
            sd.literal("BTREE"),
            sd.varChar(16)
        ),
        COMMENT : sd.nullable(sd.varChar(16)),
        INDEX_COMMENT : sd.varChar(1024),
    }
)
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema");