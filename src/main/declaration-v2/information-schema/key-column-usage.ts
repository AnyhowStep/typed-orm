import {table} from "../table";
import * as sd from "schema-decorator";

import {Table} from "../table";
import {Column} from "../column";
Table;
Column;

export const KEY_COLUMN_USAGE = table(
    "KEY_COLUMN_USAGE",
    {
        CONSTRAINT_CATALOG : sd.varChar(512),
        CONSTRAINT_SCHEMA : sd.varChar(64),
        CONSTRAINT_NAME : sd.varChar(64),
        TABLE_CATALOG : sd.varChar(512),
        TABLE_SCHEMA : sd.varChar(64),
        TABLE_NAME : sd.varChar(64),
        COLUMN_NAME : sd.varChar(64),
        ORDINAL_POSITION : sd.stringToNaturalNumber(),
        POSITION_IN_UNIQUE_CONSTRAINT : sd.nullable(sd.stringToNaturalNumber()),
        REFERENCED_TABLE_SCHEMA : sd.nullable(sd.varChar(64)),
        REFERENCED_TABLE_NAME : sd.nullable(sd.varChar(64)),
        REFERENCED_COLUMN_NAME : sd.nullable(sd.varChar(64)),
    }
)
    //HACK We make them generated so we cannot insert into the table
    .setIsGenerated(c => [
        c.CONSTRAINT_CATALOG,
        c.CONSTRAINT_SCHEMA,
        c.CONSTRAINT_NAME,
        c.TABLE_CATALOG,
        c.TABLE_SCHEMA,
        c.TABLE_NAME,
        c.COLUMN_NAME,
        c.ORDINAL_POSITION,
        c.POSITION_IN_UNIQUE_CONSTRAINT,
        c.REFERENCED_TABLE_SCHEMA,
        c.REFERENCED_TABLE_NAME,
        c.REFERENCED_COLUMN_NAME,
    ])
    .setImmutable()
    .build()
    .setHackedDatabaseName("information_schema");