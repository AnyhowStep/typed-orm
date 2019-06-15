import * as o from "../../../../../dist/src/main";
export declare const ai: o.Table<{
    readonly usedRef: {};
    readonly alias: "joined1";
    readonly columns: {
        readonly a: o.Column<{
            tableAlias: "joined1";
            name: "a";
            assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        }>;
        readonly b: o.Column<{
            tableAlias: "joined1";
            name: "b";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "joined1";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly c: o.Column<{
            tableAlias: "joined1";
            name: "c";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly d: o.Column<{
            tableAlias: "joined1";
            name: "d";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
    };
    readonly autoIncrement: "b";
    readonly id: "b";
    readonly primaryKey: "b"[];
    readonly candidateKeys: (("c" | "d")[] | "b"[] | "y"[])[];
    readonly generated: "b"[];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: "b"[];
    readonly mutable: ("a" | "y" | "c" | "d")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
