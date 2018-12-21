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
    };
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const emptyTable: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {};
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: never[];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const nullableTable: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: sd.AssertDelegate<number | null> & {
                __accepts: number | null;
                __canAccept: number | null;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly isNullable: "a"[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: "a"[];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
