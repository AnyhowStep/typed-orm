import * as sd from "type-mapping";
declare const x: {
    COLUMNS: import("../table").Table<{
        readonly usedRef: {};
        readonly alias: "COLUMNS";
        readonly columns: {
            readonly PRIVILEGES: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "PRIVILEGES";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_CATALOG: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "TABLE_CATALOG";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_SCHEMA: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "TABLE_SCHEMA";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_NAME: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "TABLE_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly COLUMN_NAME: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "COLUMN_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly ORDINAL_POSITION: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "ORDINAL_POSITION";
                assertDelegate: sd.Mapper<unknown, number>;
            }>;
            readonly COLUMN_DEFAULT: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "COLUMN_DEFAULT";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly IS_NULLABLE: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "IS_NULLABLE";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly DATA_TYPE: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "DATA_TYPE";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly CHARACTER_MAXIMUM_LENGTH: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "CHARACTER_MAXIMUM_LENGTH";
                assertDelegate: sd.Mapper<unknown, bigint | null>;
            }>;
            readonly CHARACTER_OCTET_LENGTH: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "CHARACTER_OCTET_LENGTH";
                assertDelegate: sd.Mapper<unknown, bigint | null>;
            }>;
            readonly NUMERIC_PRECISION: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "NUMERIC_PRECISION";
                assertDelegate: sd.Mapper<unknown, number | null>;
            }>;
            readonly NUMERIC_SCALE: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "NUMERIC_SCALE";
                assertDelegate: sd.Mapper<unknown, number | null>;
            }>;
            readonly DATETIME_PRECISION: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "DATETIME_PRECISION";
                assertDelegate: sd.Mapper<unknown, number | null>;
            }>;
            readonly CHARACTER_SET_NAME: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "CHARACTER_SET_NAME";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly COLLATION_NAME: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "COLLATION_NAME";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly COLUMN_TYPE: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "COLUMN_TYPE";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly COLUMN_KEY: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "COLUMN_KEY";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly EXTRA: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "EXTRA";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly COLUMN_COMMENT: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "COLUMN_COMMENT";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly GENERATION_EXPRESSION: import("..").Column<{
                tableAlias: "COLUMNS";
                name: "GENERATION_EXPRESSION";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: ("TABLE_SCHEMA" | "TABLE_NAME" | "COLUMN_NAME")[][];
        readonly generated: [];
        readonly isNullable: ("COLUMN_DEFAULT" | "CHARACTER_MAXIMUM_LENGTH" | "CHARACTER_OCTET_LENGTH" | "NUMERIC_PRECISION" | "NUMERIC_SCALE" | "DATETIME_PRECISION" | "CHARACTER_SET_NAME" | "COLLATION_NAME")[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: [];
        readonly parents: [];
        readonly insertAllowed: false;
        readonly deleteAllowed: false;
    }>;
};
export = x;
