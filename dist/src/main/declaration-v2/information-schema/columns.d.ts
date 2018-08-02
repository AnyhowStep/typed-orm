import { Table } from "../table";
import { Column } from "../column";
export declare const COLUMNS: Table<"COLUMNS", "COLUMNS", {
    readonly TABLE_CATALOG: Column<"COLUMNS", "TABLE_CATALOG", string>;
    readonly TABLE_SCHEMA: Column<"COLUMNS", "TABLE_SCHEMA", string>;
    readonly TABLE_NAME: Column<"COLUMNS", "TABLE_NAME", string>;
    readonly COLUMN_NAME: Column<"COLUMNS", "COLUMN_NAME", string>;
    readonly ORDINAL_POSITION: Column<"COLUMNS", "ORDINAL_POSITION", number>;
    readonly COLUMN_DEFAULT: Column<"COLUMNS", "COLUMN_DEFAULT", string | null>;
    readonly IS_NULLABLE: Column<"COLUMNS", "IS_NULLABLE", string>;
    readonly DATA_TYPE: Column<"COLUMNS", "DATA_TYPE", string>;
    readonly CHARACTER_MAXIMUM_LENGTH: Column<"COLUMNS", "CHARACTER_MAXIMUM_LENGTH", number | null>;
    readonly CHARACTER_OCTET_LENGTH: Column<"COLUMNS", "CHARACTER_OCTET_LENGTH", number | null>;
    readonly NUMERIC_PRECISION: Column<"COLUMNS", "NUMERIC_PRECISION", number | null>;
    readonly NUMERIC_SCALE: Column<"COLUMNS", "NUMERIC_SCALE", number | null>;
    readonly DATETIME_PRECISION: Column<"COLUMNS", "DATETIME_PRECISION", number | null>;
    readonly CHARACTER_SET_NAME: Column<"COLUMNS", "CHARACTER_SET_NAME", string | null>;
    readonly COLLATION_NAME: Column<"COLUMNS", "COLLATION_NAME", string | null>;
    readonly COLUMN_TYPE: Column<"COLUMNS", "COLUMN_TYPE", string>;
    readonly COLUMN_KEY: Column<"COLUMNS", "COLUMN_KEY", string>;
    readonly EXTRA: Column<"COLUMNS", "EXTRA", string>;
    readonly PRIVILEGES: Column<"COLUMNS", "PRIVILEGES", string>;
    readonly COLUMN_COMMENT: Column<"COLUMNS", "COLUMN_COMMENT", string>;
    readonly GENERATION_EXPRESSION: Column<"COLUMNS", "GENERATION_EXPRESSION", string>;
}, {
    readonly autoIncrement: undefined;
    readonly isGenerated: {};
    readonly hasDefaultValue: {
        COLUMN_DEFAULT: true;
        CHARACTER_MAXIMUM_LENGTH: true;
        CHARACTER_OCTET_LENGTH: true;
        NUMERIC_PRECISION: true;
        NUMERIC_SCALE: true;
        DATETIME_PRECISION: true;
        CHARACTER_SET_NAME: true;
        COLLATION_NAME: true;
    } & {
        readonly TABLE_CATALOG: true;
        readonly TABLE_SCHEMA: true;
        readonly TABLE_NAME: true;
        readonly COLUMN_NAME: true;
        readonly ORDINAL_POSITION: true;
        readonly IS_NULLABLE: true;
        readonly DATA_TYPE: true;
        readonly COLUMN_KEY: true;
        readonly EXTRA: true;
        readonly PRIVILEGES: true;
        readonly COLUMN_COMMENT: true;
        readonly GENERATION_EXPRESSION: true;
    };
    readonly isMutable: {};
    readonly id: undefined;
    readonly uniqueKeys: undefined;
    readonly parentTables: undefined;
}>;
//# sourceMappingURL=columns.d.ts.map