import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const parent: o.Table<{
    readonly usedRef: {};
    readonly alias: "parent";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "parent";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly w: o.Column<{
            tableAlias: "parent";
            name: "w";
            assertDelegate: sd.AssertDelegate<Date> & {
                __accepts: Date;
                __canAccept: string | number | Date;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "w")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
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
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: [];
    readonly parents: o.Table<{
        readonly usedRef: {};
        readonly alias: "parent";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "parent";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly w: o.Column<{
                tableAlias: "parent";
                name: "w";
                assertDelegate: sd.AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: string | number | Date;
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly candidateKeys: "x"[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("x" | "w")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>[];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
