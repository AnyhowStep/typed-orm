import * as sd from "schema-decorator";
import { Table } from "../table";
import { Column } from "../column";
export declare const STATISTICS: Table<{
    readonly usedRef: {};
    readonly alias: "STATISTICS";
    readonly columns: {
        readonly COLLATION: Column<{
            tableAlias: "STATISTICS";
            name: "COLLATION";
            assertDelegate: sd.AssertDelegate<string | null> & {
                __accepts: string | null;
                __canAccept: string | null;
            };
        }>;
        readonly COMMENT: Column<{
            tableAlias: "STATISTICS";
            name: "COMMENT";
            assertDelegate: sd.AssertDelegate<string | null> & {
                __accepts: string | null;
                __canAccept: string | null;
            };
        }>;
        readonly TABLE_CATALOG: Column<{
            tableAlias: "STATISTICS";
            name: "TABLE_CATALOG";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly TABLE_SCHEMA: Column<{
            tableAlias: "STATISTICS";
            name: "TABLE_SCHEMA";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly TABLE_NAME: Column<{
            tableAlias: "STATISTICS";
            name: "TABLE_NAME";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly COLUMN_NAME: Column<{
            tableAlias: "STATISTICS";
            name: "COLUMN_NAME";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly NON_UNIQUE: Column<{
            tableAlias: "STATISTICS";
            name: "NON_UNIQUE";
            assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: number | boolean;
            };
        }>;
        readonly INDEX_SCHEMA: Column<{
            tableAlias: "STATISTICS";
            name: "INDEX_SCHEMA";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly INDEX_NAME: Column<{
            tableAlias: "STATISTICS";
            name: "INDEX_NAME";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly SEQ_IN_INDEX: Column<{
            tableAlias: "STATISTICS";
            name: "SEQ_IN_INDEX";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: string | number;
            };
        }>;
        readonly CARDINALITY: Column<{
            tableAlias: "STATISTICS";
            name: "CARDINALITY";
            assertDelegate: sd.AssertDelegate<string | null> & {
                __accepts: string | null;
                __canAccept: string | null;
            };
        }>;
        readonly SUB_PART: Column<{
            tableAlias: "STATISTICS";
            name: "SUB_PART";
            assertDelegate: sd.AssertDelegate<number | null> & {
                __accepts: number | null;
                __canAccept: string | number | null;
            };
        }>;
        readonly PACKED: Column<{
            tableAlias: "STATISTICS";
            name: "PACKED";
            assertDelegate: sd.AssertDelegate<string | null> & {
                __accepts: string | null;
                __canAccept: string | null;
            };
        }>;
        readonly NULLABLE: Column<{
            tableAlias: "STATISTICS";
            name: "NULLABLE";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly INDEX_TYPE: Column<{
            tableAlias: "STATISTICS";
            name: "INDEX_TYPE";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly INDEX_COMMENT: Column<{
            tableAlias: "STATISTICS";
            name: "INDEX_COMMENT";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
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
//# sourceMappingURL=statistics.d.ts.map