import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedColumns: never[];
    readonly alias: "table";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
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
    readonly autoIncrement: "x";
    readonly id: "x";
    readonly primaryKey: "x"[];
    readonly candidateKeys: "x"[][];
    readonly generated: "x"[];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: "x"[];
    readonly mutable: ("y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
