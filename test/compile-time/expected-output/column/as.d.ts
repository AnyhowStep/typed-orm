import * as o from "../../../../dist/src/main";
export declare const aliased: o.IExprSelectItem<{
    readonly usedRef: {
        readonly tableAlias: {
            readonly columnName: o.Column<{
                readonly tableAlias: "tableAlias";
                readonly name: "columnName";
                readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
        };
    };
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
    readonly tableAlias: "tableAlias";
    readonly alias: "newColumnName";
}>;
