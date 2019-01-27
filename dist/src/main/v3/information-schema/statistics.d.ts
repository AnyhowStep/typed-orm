import * as sd from "schema-decorator";
declare const x: {
    STATISTICS: import("../table").Table<{
        readonly usedColumns: never[];
        readonly alias: "STATISTICS";
        readonly columns: {
            readonly COLLATION: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "COLLATION";
                assertDelegate: sd.AssertDelegate<string | null>;
            }>;
            readonly COMMENT: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "COMMENT";
                assertDelegate: sd.AssertDelegate<string | null>;
            }>;
            readonly TABLE_CATALOG: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "TABLE_CATALOG";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly TABLE_SCHEMA: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "TABLE_SCHEMA";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly TABLE_NAME: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "TABLE_NAME";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly NON_UNIQUE: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "NON_UNIQUE";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
            readonly INDEX_SCHEMA: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_SCHEMA";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly INDEX_NAME: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_NAME";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly SEQ_IN_INDEX: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "SEQ_IN_INDEX";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly COLUMN_NAME: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "COLUMN_NAME";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly CARDINALITY: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "CARDINALITY";
                assertDelegate: sd.AssertDelegate<bigint | null>;
            }>;
            readonly SUB_PART: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "SUB_PART";
                assertDelegate: sd.AssertDelegate<number | null>;
            }>;
            readonly PACKED: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "PACKED";
                assertDelegate: sd.AssertDelegate<string | null>;
            }>;
            readonly NULLABLE: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "NULLABLE";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly INDEX_TYPE: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_TYPE";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly INDEX_COMMENT: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_COMMENT";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: [];
        readonly generated: [];
        readonly isNullable: ("COLLATION" | "COMMENT" | "CARDINALITY" | "SUB_PART" | "PACKED")[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: [];
        readonly parents: [];
        readonly insertAllowed: false;
        readonly deleteAllowed: false;
    }>;
};
export = x;
