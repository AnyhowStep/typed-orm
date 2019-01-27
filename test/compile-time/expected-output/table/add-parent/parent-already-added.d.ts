import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const parent: o.Table<{
    readonly usedColumns: never[];
    readonly alias: "parent";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "parent";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "parent";
            name: "y";
            assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly z: o.Column<{
            tableAlias: "parent";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const table: any;
