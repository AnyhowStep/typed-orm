import * as o from "../../../../../dist/src/main";
export declare const parent: o.Table<{
    readonly usedRef: {};
    readonly alias: "parent";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "parent";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "parent";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly z: o.Column<{
            tableAlias: "parent";
            name: "z";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
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
