import * as sd from "type-mapping";
declare const x: {
    STATISTICS: import("../table").Table<{
        readonly usedRef: {};
        readonly alias: "STATISTICS";
        readonly columns: {
            readonly COLLATION: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "COLLATION";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly COMMENT: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "COMMENT";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly TABLE_CATALOG: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "TABLE_CATALOG";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_SCHEMA: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "TABLE_SCHEMA";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly TABLE_NAME: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "TABLE_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly NON_UNIQUE: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "NON_UNIQUE";
                assertDelegate: sd.Mapper<unknown, boolean>;
            }>;
            readonly INDEX_SCHEMA: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_SCHEMA";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly INDEX_NAME: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly SEQ_IN_INDEX: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "SEQ_IN_INDEX";
                assertDelegate: sd.Mapper<unknown, number>;
            }>;
            readonly COLUMN_NAME: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "COLUMN_NAME";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly CARDINALITY: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "CARDINALITY";
                assertDelegate: sd.Mapper<unknown, bigint | null>;
            }>;
            readonly SUB_PART: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "SUB_PART";
                assertDelegate: sd.Mapper<unknown, number | null>;
            }>;
            readonly PACKED: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "PACKED";
                assertDelegate: sd.Mapper<unknown, string | null>;
            }>;
            readonly NULLABLE: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "NULLABLE";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly INDEX_TYPE: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_TYPE";
                assertDelegate: sd.Mapper<unknown, string>;
            }>;
            readonly INDEX_COMMENT: import("..").Column<{
                tableAlias: "STATISTICS";
                name: "INDEX_COMMENT";
                assertDelegate: sd.Mapper<unknown, string>;
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
