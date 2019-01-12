import {table} from "../table";
import * as sd from "schema-decorator";

export const TABLES = table(
    "TABLES",
    {
        TABLE_CATALOG : sd.varChar(512),
        TABLE_SCHEMA : sd.varChar(64),
        TABLE_NAME : sd.varChar(64),
        TABLE_TYPE : sd.varChar(64),
        ENGINE : sd.nullable(sd.varChar(64)),
        VERSION : sd.nullable(sd.stringToNaturalNumber()),
        ROW_FORMAT : sd.nullable(sd.varChar(10)),
        TABLE_ROWS : sd.nullable(sd.stringToNaturalNumber()),
        AVG_ROW_LENGTH : sd.nullable(sd.stringToNaturalNumber()),
        DATA_LENGTH : sd.nullable(sd.stringToNaturalNumber()),
        MAX_DATA_LENGTH : sd.nullable(sd.stringToNaturalNumber()),
        INDEX_LENGTH : sd.nullable(sd.stringToNaturalNumber()),
        DATA_FREE : sd.nullable(sd.stringToNaturalNumber()),
        AUTO_INCREMENT : sd.nullable(sd.stringToNaturalNumber()),
        CREATE_TIME : sd.nullable(sd.dateTime()),
        UPDATE_TIME : sd.nullable(sd.dateTime()),
        CHECK_TIME : sd.nullable(sd.dateTime()),
        TABLE_COLLATION : sd.nullable(sd.varChar(32)),
        CHECKSUM : sd.nullable(sd.stringToNaturalNumber()),
        CREATE_OPTIONS : sd.nullable(sd.varChar(255)),
        TABLE_COMMENT : sd.varChar(2048),
    }
)
    .disallowInsert()
    .disallowDelete()
    .setImmutable()
    .setDatabaseName("information_schema");