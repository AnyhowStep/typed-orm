import {table} from "../table";
import * as sd from "schema-decorator";

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
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema");