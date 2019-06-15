import * as o from "../../../../../dist/src/main";
export declare const i: o.Table<{
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
            assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
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
    readonly autoIncrement: undefined;
    readonly id: "b";
    readonly primaryKey: "b"[];
    readonly candidateKeys: (("c" | "d")[] | "b"[] | "y"[])[];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("a" | "b" | "y" | "c" | "d")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
