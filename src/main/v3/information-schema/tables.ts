import * as sd from "schema-decorator";
import {table} from "../table";
import {lazyInit} from "../type";
import * as dataType from "../data-type";

const x = lazyInit(
    "TABLES",
    () => table(
        "TABLES",
        {
            TABLE_CATALOG : sd.varChar(512),
            TABLE_SCHEMA : sd.varChar(64),
            TABLE_NAME : sd.varChar(64),
            TABLE_TYPE : sd.varChar(64),
            ENGINE : sd.nullable(sd.varChar(64)),
            VERSION : sd.nullable(dataType.bigint()),
            ROW_FORMAT : sd.nullable(sd.varChar(10)),
            TABLE_ROWS : sd.nullable(dataType.bigint()),
            AVG_ROW_LENGTH : sd.nullable(dataType.bigint()),
            DATA_LENGTH : sd.nullable(dataType.bigint()),
            MAX_DATA_LENGTH : sd.nullable(dataType.bigint()),
            INDEX_LENGTH : sd.nullable(dataType.bigint()),
            DATA_FREE : sd.nullable(dataType.bigint()),
            AUTO_INCREMENT : sd.nullable(dataType.bigint()),
            CREATE_TIME : sd.nullable(sd.dateTime()),
            UPDATE_TIME : sd.nullable(sd.dateTime()),
            CHECK_TIME : sd.nullable(sd.dateTime()),
            TABLE_COLLATION : sd.nullable(sd.varChar(32)),
            CHECKSUM : sd.nullable(dataType.bigint()),
            CREATE_OPTIONS : sd.nullable(sd.varChar(255)),
            TABLE_COMMENT : sd.varChar(2048),
        }
    )
        .disallowInsert()
        .disallowDelete()
        .setImmutable()
        .setDatabaseName("information_schema")
);
export = x;