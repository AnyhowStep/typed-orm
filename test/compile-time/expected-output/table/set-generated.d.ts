import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const table: o.Table<{
    readonly alias: "table";
    readonly name: "table";
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
    readonly candidateKeys: [];
    readonly generated: ("x" | "z")[];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: ("x" | "z")[];
    readonly mutable: "y"[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;