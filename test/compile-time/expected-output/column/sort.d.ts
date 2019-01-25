import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const sortAsc: [o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<number>;
}>, o.SortDirection];
export declare const sortDesc: [o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<number>;
}>, o.SortDirection];
