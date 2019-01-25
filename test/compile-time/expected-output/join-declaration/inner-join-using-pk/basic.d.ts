import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const j1: o.JoinDeclaration<{
    readonly fromTable: o.Table<{
        readonly usedRef: {};
        readonly alias: "table";
        readonly columns: {
            readonly b: o.Column<{
                tableAlias: "table";
                name: "b";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: [];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("b" | "y" | "z")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    readonly toTable: o.Table<{
        readonly usedRef: {};
        readonly alias: "joined1";
        readonly columns: {
            readonly a: o.Column<{
                tableAlias: "joined1";
                name: "a";
                assertDelegate: sd.AssertDelegate<Date>;
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "joined1";
                name: "y";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: ("b" | "y")[];
        readonly candidateKeys: ("b" | "y")[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("a" | "b" | "y")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    readonly nullable: false;
}>;
