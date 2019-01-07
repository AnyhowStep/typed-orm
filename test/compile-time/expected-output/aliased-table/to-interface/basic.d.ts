import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
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
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const a: o.IAliasedTable<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly x: o.IColumn<{
            readonly tableAlias: "table";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.IColumn<{
            readonly tableAlias: "table";
            readonly name: "y";
            readonly assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.IColumn<{
            readonly tableAlias: "table";
            readonly name: "z";
            readonly assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
    };
}>;