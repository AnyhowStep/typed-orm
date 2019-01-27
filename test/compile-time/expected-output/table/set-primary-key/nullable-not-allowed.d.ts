import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const joined2: void | o.Table<{
    readonly usedColumns: never[];
    readonly alias: "joined2";
    readonly columns: {
        readonly a: o.Column<{
            tableAlias: "joined2";
            name: "a";
            assertDelegate: sd.AssertDelegate<Date>;
        }>;
        readonly b: o.Column<{
            tableAlias: "joined2";
            name: "b";
            assertDelegate: sd.AssertDelegate<number | null>;
        }>;
        readonly y: o.Column<{
            tableAlias: "joined2";
            name: "y";
            assertDelegate: sd.AssertDelegate<string>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: any[];
    readonly candidateKeys: any[][];
    readonly generated: [];
    readonly isNullable: "b"[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("a" | "b" | "y")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}> | [any, "is not a column of", "joined2"];
