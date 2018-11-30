import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const t: o.Table<{
    readonly alias: "t";
    readonly name: "t";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly hasDefaultValue: never[];
    readonly mutable: ("x" | "y")[];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const j: o.Join<{
    aliasedTable: o.Table<{
        readonly alias: "t";
        readonly name: "t";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "t";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "t";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly generated: [];
        readonly hasDefaultValue: never[];
        readonly mutable: ("x" | "y")[];
        readonly id: undefined;
        readonly candidateKeys: [];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    columns: {
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
    };
    nullable: false;
}>;
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "t";
        name: "x";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly y: o.Column<{
        tableAlias: "t";
        name: "y";
        assertDelegate: sd.AssertDelegate<string> & {
            __accepts: string;
            __canAccept: string;
        };
    }>;
};
export declare const nullableJ: o.Join<{
    aliasedTable: o.Table<{
        readonly alias: "t";
        readonly name: "t";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "t";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "t";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly generated: [];
        readonly hasDefaultValue: never[];
        readonly mutable: ("x" | "y")[];
        readonly id: undefined;
        readonly candidateKeys: [];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    columns: {
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
    };
    nullable: true;
}>;
export declare const nullableColumnMap: {
    readonly x: o.Column<{
        readonly tableAlias: "t";
        readonly name: "x";
        readonly assertDelegate: sd.AssertDelegate<number | null>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "t";
        readonly name: "y";
        readonly assertDelegate: sd.AssertDelegate<string | null>;
    }>;
};
