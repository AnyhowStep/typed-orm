import * as sd from "type-mapping";
declare const x: {
    KEY_COLUMN_USAGE: import("../table").Table<{
        readonly usedRef: {};
        readonly alias: "KEY_COLUMN_USAGE";
        readonly columns: {
            readonly TABLE_CATALOG: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "TABLE_CATALOG";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_SCHEMA: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "TABLE_SCHEMA";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_NAME: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "TABLE_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly COLUMN_NAME: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "COLUMN_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly ORDINAL_POSITION: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "ORDINAL_POSITION";
                assertDelegate: sd.Mapper<unknown, number>;
            }>;
            readonly CONSTRAINT_CATALOG: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "CONSTRAINT_CATALOG";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly CONSTRAINT_SCHEMA: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "CONSTRAINT_SCHEMA";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly CONSTRAINT_NAME: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "CONSTRAINT_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly POSITION_IN_UNIQUE_CONSTRAINT: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "POSITION_IN_UNIQUE_CONSTRAINT";
                assertDelegate: sd.Mapper<unknown, number | null>;
            }>;
            readonly REFERENCED_TABLE_SCHEMA: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "REFERENCED_TABLE_SCHEMA";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly REFERENCED_TABLE_NAME: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "REFERENCED_TABLE_NAME";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly REFERENCED_COLUMN_NAME: import("..").Column<{
                tableAlias: "KEY_COLUMN_USAGE";
                name: "REFERENCED_COLUMN_NAME";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: [];
        readonly generated: [];
        readonly isNullable: ("POSITION_IN_UNIQUE_CONSTRAINT" | "REFERENCED_TABLE_SCHEMA" | "REFERENCED_TABLE_NAME" | "REFERENCED_COLUMN_NAME")[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: [];
        readonly parents: [];
        readonly insertAllowed: false;
        readonly deleteAllowed: false;
    }>;
};
export = x;
