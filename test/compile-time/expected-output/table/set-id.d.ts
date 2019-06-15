import * as o from "../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: "z";
    readonly primaryKey: "z"[];
    readonly candidateKeys: "z"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
