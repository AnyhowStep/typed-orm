import * as sd from "schema-decorator";
declare const x: {
    TABLES: import("../table").Table<{
        readonly usedRef: {};
        readonly alias: "TABLES";
        readonly columns: {
            readonly AUTO_INCREMENT: import("..").Column<{
                tableAlias: "TABLES";
                name: "AUTO_INCREMENT";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly CHECKSUM: import("..").Column<{
                tableAlias: "TABLES";
                name: "CHECKSUM";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly ENGINE: import("..").Column<{
                tableAlias: "TABLES";
                name: "ENGINE";
                assertDelegate: sd.AssertDelegate<string | null> & {
                    __accepts: string | null;
                    __canAccept: string | null;
                };
            }>;
            readonly ROW_FORMAT: import("..").Column<{
                tableAlias: "TABLES";
                name: "ROW_FORMAT";
                assertDelegate: sd.AssertDelegate<string | null> & {
                    __accepts: string | null;
                    __canAccept: string | null;
                };
            }>;
            readonly TABLE_CATALOG: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_CATALOG";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly TABLE_SCHEMA: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_SCHEMA";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly TABLE_NAME: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_NAME";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly TABLE_TYPE: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_TYPE";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly VERSION: import("..").Column<{
                tableAlias: "TABLES";
                name: "VERSION";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly TABLE_ROWS: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_ROWS";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly AVG_ROW_LENGTH: import("..").Column<{
                tableAlias: "TABLES";
                name: "AVG_ROW_LENGTH";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly DATA_LENGTH: import("..").Column<{
                tableAlias: "TABLES";
                name: "DATA_LENGTH";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly MAX_DATA_LENGTH: import("..").Column<{
                tableAlias: "TABLES";
                name: "MAX_DATA_LENGTH";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly INDEX_LENGTH: import("..").Column<{
                tableAlias: "TABLES";
                name: "INDEX_LENGTH";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly DATA_FREE: import("..").Column<{
                tableAlias: "TABLES";
                name: "DATA_FREE";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: string | number | null;
                };
            }>;
            readonly CREATE_TIME: import("..").Column<{
                tableAlias: "TABLES";
                name: "CREATE_TIME";
                assertDelegate: sd.AssertDelegate<Date | null> & {
                    __accepts: Date | null;
                    __canAccept: string | number | Date | null;
                };
            }>;
            readonly UPDATE_TIME: import("..").Column<{
                tableAlias: "TABLES";
                name: "UPDATE_TIME";
                assertDelegate: sd.AssertDelegate<Date | null> & {
                    __accepts: Date | null;
                    __canAccept: string | number | Date | null;
                };
            }>;
            readonly CHECK_TIME: import("..").Column<{
                tableAlias: "TABLES";
                name: "CHECK_TIME";
                assertDelegate: sd.AssertDelegate<Date | null> & {
                    __accepts: Date | null;
                    __canAccept: string | number | Date | null;
                };
            }>;
            readonly TABLE_COLLATION: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_COLLATION";
                assertDelegate: sd.AssertDelegate<string | null> & {
                    __accepts: string | null;
                    __canAccept: string | null;
                };
            }>;
            readonly CREATE_OPTIONS: import("..").Column<{
                tableAlias: "TABLES";
                name: "CREATE_OPTIONS";
                assertDelegate: sd.AssertDelegate<string | null> & {
                    __accepts: string | null;
                    __canAccept: string | null;
                };
            }>;
            readonly TABLE_COMMENT: import("..").Column<{
                tableAlias: "TABLES";
                name: "TABLE_COMMENT";
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
        readonly isNullable: ("AUTO_INCREMENT" | "CHECKSUM" | "ENGINE" | "ROW_FORMAT" | "VERSION" | "TABLE_ROWS" | "AVG_ROW_LENGTH" | "DATA_LENGTH" | "MAX_DATA_LENGTH" | "INDEX_LENGTH" | "DATA_FREE" | "CREATE_TIME" | "UPDATE_TIME" | "CHECK_TIME" | "TABLE_COLLATION" | "CREATE_OPTIONS")[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: [];
        readonly parents: [];
        readonly insertAllowed: false;
        readonly deleteAllowed: false;
    }>;
};
export = x;
//# sourceMappingURL=tables.d.ts.map