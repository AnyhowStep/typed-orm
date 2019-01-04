import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedRef: {};
    readonly alias: "t";
    readonly columns: {
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("y" | "x")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const join: o.Join<{
    aliasedTable: o.Table<{
        readonly usedRef: {};
        readonly alias: "t";
        readonly columns: {
            readonly y: o.Column<{
                tableAlias: "t";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly x: o.Column<{
                tableAlias: "t";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: [];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("y" | "x")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    columns: {
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
    };
    nullable: false;
}>;
export declare const columnMap: {
    readonly y: o.Column<{
        tableAlias: "t";
        name: "y";
        assertDelegate: sd.AssertDelegate<string> & {
            __accepts: string;
            __canAccept: string;
        };
    }>;
    readonly x: o.Column<{
        tableAlias: "t";
        name: "x";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
};
export declare const nullableJoin: o.Join<{
    aliasedTable: o.Table<{
        readonly usedRef: {};
        readonly alias: "t";
        readonly columns: {
            readonly y: o.Column<{
                tableAlias: "t";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly x: o.Column<{
                tableAlias: "t";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: [];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("y" | "x")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    columns: {
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
    };
    nullable: true;
}>;
export declare const nullableColumnMap: {
    readonly y: o.Column<{
        readonly tableAlias: "t";
        readonly name: "y";
        readonly assertDelegate: sd.AssertDelegate<string | null>;
    }>;
    readonly x: o.Column<{
        readonly tableAlias: "t";
        readonly name: "x";
        readonly assertDelegate: sd.AssertDelegate<number | null>;
    }>;
};
export declare const untypedJoin: o.IJoin;
export declare const untypedColumnMap: {
    readonly [x: string]: o.Column<{
        readonly tableAlias: string;
        readonly name: string;
        readonly assertDelegate: sd.AssertDelegate<any>;
    }>;
};
