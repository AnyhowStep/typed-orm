import * as o from "../../../../../dist/src/main";
export declare const fromJoin: (o.Column<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: import("type-mapping").Mapper<unknown, number>;
}> | o.Column<{
    tableAlias: "someTable";
    name: "y";
    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
}> | o.Column<{
    tableAlias: "someTable";
    name: "z";
    assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
}>)[];
export declare const fromNullableJoin: (o.Column<{
    readonly tableAlias: "someTable";
    readonly name: "x";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
}> | o.Column<{
    readonly tableAlias: "someTable";
    readonly name: "y";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, Date | null>;
}> | o.Column<{
    readonly tableAlias: "someTable";
    readonly name: "z";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer | null>;
}>)[];
