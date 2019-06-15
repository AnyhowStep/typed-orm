import * as o from "../../../../dist/src/main";
export declare const result: o.IColumn<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
}> | o.IColumn<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName2";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
}>;
