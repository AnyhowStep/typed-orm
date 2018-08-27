import { Table } from "../table";
import { Column } from "../column";
export declare const TABLES: Table<"TABLES", "TABLES", {
    readonly TABLE_CATALOG: Column<"TABLES", "TABLE_CATALOG", string>;
    readonly TABLE_SCHEMA: Column<"TABLES", "TABLE_SCHEMA", string>;
    readonly TABLE_NAME: Column<"TABLES", "TABLE_NAME", string>;
    readonly TABLE_TYPE: Column<"TABLES", "TABLE_TYPE", string>;
    readonly ENGINE: Column<"TABLES", "ENGINE", string | null>;
    readonly VERSION: Column<"TABLES", "VERSION", number | null>;
    readonly ROW_FORMAT: Column<"TABLES", "ROW_FORMAT", string | null>;
    readonly TABLE_ROWS: Column<"TABLES", "TABLE_ROWS", number | null>;
    readonly AVG_ROW_LENGTH: Column<"TABLES", "AVG_ROW_LENGTH", number | null>;
    readonly DATA_LENGTH: Column<"TABLES", "DATA_LENGTH", number | null>;
    readonly MAX_DATA_LENGTH: Column<"TABLES", "MAX_DATA_LENGTH", number | null>;
    readonly INDEX_LENGTH: Column<"TABLES", "INDEX_LENGTH", number | null>;
    readonly DATA_FREE: Column<"TABLES", "DATA_FREE", number | null>;
    readonly AUTO_INCREMENT: Column<"TABLES", "AUTO_INCREMENT", number | null>;
    readonly CREATE_TIME: Column<"TABLES", "CREATE_TIME", Date | null>;
    readonly UPDATE_TIME: Column<"TABLES", "UPDATE_TIME", Date | null>;
    readonly CHECK_TIME: Column<"TABLES", "CHECK_TIME", Date | null>;
    readonly TABLE_COLLATION: Column<"TABLES", "TABLE_COLLATION", string | null>;
    readonly CHECKSUM: Column<"TABLES", "CHECKSUM", number | null>;
    readonly CREATE_OPTIONS: Column<"TABLES", "CREATE_OPTIONS", string | null>;
    readonly TABLE_COMMENT: Column<"TABLES", "TABLE_COMMENT", string>;
}, {
    readonly autoIncrement: undefined;
    readonly isGenerated: {
        readonly TABLE_CATALOG: true;
        readonly TABLE_SCHEMA: true;
        readonly TABLE_NAME: true;
        readonly TABLE_TYPE: true;
        readonly ENGINE: true;
        readonly VERSION: true;
        readonly ROW_FORMAT: true;
        readonly TABLE_ROWS: true;
        readonly AVG_ROW_LENGTH: true;
        readonly DATA_LENGTH: true;
        readonly MAX_DATA_LENGTH: true;
        readonly INDEX_LENGTH: true;
        readonly DATA_FREE: true;
        readonly AUTO_INCREMENT: true;
        readonly CREATE_TIME: true;
        readonly UPDATE_TIME: true;
        readonly CHECK_TIME: true;
        readonly TABLE_COLLATION: true;
        readonly CHECKSUM: true;
        readonly CREATE_OPTIONS: true;
        readonly TABLE_COMMENT: true;
    };
    readonly hasDefaultValue: {
        readonly TABLE_CATALOG: true;
        readonly TABLE_SCHEMA: true;
        readonly TABLE_NAME: true;
        readonly TABLE_TYPE: true;
        readonly ENGINE: true;
        readonly VERSION: true;
        readonly ROW_FORMAT: true;
        readonly TABLE_ROWS: true;
        readonly AVG_ROW_LENGTH: true;
        readonly DATA_LENGTH: true;
        readonly MAX_DATA_LENGTH: true;
        readonly INDEX_LENGTH: true;
        readonly DATA_FREE: true;
        readonly AUTO_INCREMENT: true;
        readonly CREATE_TIME: true;
        readonly UPDATE_TIME: true;
        readonly CHECK_TIME: true;
        readonly TABLE_COLLATION: true;
        readonly CHECKSUM: true;
        readonly CREATE_OPTIONS: true;
        readonly TABLE_COMMENT: true;
    };
    readonly isMutable: {};
    readonly id: undefined;
    readonly uniqueKeys: undefined;
    readonly parentTables: undefined;
}>;
//# sourceMappingURL=tables.d.ts.map