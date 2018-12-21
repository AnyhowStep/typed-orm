import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
    } & {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly b: o.Column<{
            tableAlias: "table";
            name: "b";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly c: o.Column<{
            tableAlias: "table";
            name: "c";
            assertDelegate: sd.AssertDelegate<boolean | null> & {
                __accepts: boolean | null;
                __canAccept: boolean | null;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: "c"[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const emptyTable: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {} & {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly b: o.Column<{
            tableAlias: "table";
            name: "b";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly c: o.Column<{
            tableAlias: "table";
            name: "c";
            assertDelegate: sd.AssertDelegate<boolean | null> & {
                __accepts: boolean | null;
                __canAccept: boolean | null;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: "c"[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: never[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const narrow: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly b: o.Column<{
            tableAlias: "table";
            name: "b";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
        readonly c: o.IColumn<{
            readonly tableAlias: "table";
            readonly name: "c";
            readonly assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    } & {};
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
