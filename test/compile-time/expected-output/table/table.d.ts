import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const t: o.Table<{
    readonly usedRef: {};
    readonly alias: "name";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "name";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "name";
            name: "y";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const t2: any;
export declare const t3: o.Table<{
    readonly usedRef: {};
    readonly alias: "232";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "232";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "232";
            name: "y";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
    };
    readonly autoIncrement: "x";
    readonly id: "x";
    readonly primaryKey: "x"[];
    readonly candidateKeys: "x"[][];
    readonly generated: "x"[];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: "x"[];
    readonly mutable: any[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
