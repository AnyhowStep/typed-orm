import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const aliased: o.IExprSelectItem<{
    readonly usedColumns: o.Column<{
        readonly tableAlias: "tableAlias";
        readonly name: "columnName";
        readonly assertDelegate: sd.AssertDelegate<number>;
    }>[];
    readonly assertDelegate: sd.AssertDelegate<number>;
    readonly tableAlias: "tableAlias";
    readonly alias: "newColumnName";
}>;
