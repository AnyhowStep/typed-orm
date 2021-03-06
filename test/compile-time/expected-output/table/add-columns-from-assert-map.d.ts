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
    } & {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly b: o.Column<{
            tableAlias: "table";
            name: "b";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly c: o.Column<{
            tableAlias: "table";
            name: "c";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean | null>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: "c"[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const emptyTable: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {} & {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly b: o.Column<{
            tableAlias: "table";
            name: "b";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly c: o.Column<{
            tableAlias: "table";
            name: "c";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean | null>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: "c"[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: never[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const narrow: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly a: o.Column<{
            tableAlias: "table";
            name: "a";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly b: o.Column<{
            tableAlias: "table";
            name: "b";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
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
        readonly c: o.IColumn<{
            readonly tableAlias: "table";
            readonly name: "c";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    } & {};
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
