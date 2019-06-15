import * as o from "../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedRef: {};
    readonly alias: "t";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
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
export declare const join: o.Join<{
    aliasedTable: o.Table<{
        readonly usedRef: {};
        readonly alias: "t";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "t";
                name: "x";
                assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "t";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
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
    columns: {
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
    };
    nullable: false;
}>;
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "t";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "t";
        name: "y";
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
};
export declare const nullableJoin: o.Join<{
    aliasedTable: o.Table<{
        readonly usedRef: {};
        readonly alias: "t";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "t";
                name: "x";
                assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "t";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
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
    columns: {
        readonly x: o.Column<{
            tableAlias: "t";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "t";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
    };
    nullable: true;
}>;
export declare const nullableColumnMap: {
    readonly x: o.Column<{
        readonly tableAlias: "t";
        readonly name: "x";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "t";
        readonly name: "y";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, string | null>;
    }>;
};
export declare const untypedJoin: o.IJoin;
export declare const untypedColumnMap: {
    readonly [x: string]: o.Column<{
        readonly tableAlias: string;
        readonly name: string;
        readonly assertDelegate: import("type-mapping").Mapper<unknown, any>;
    }>;
};
