import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const result: o.IColumn<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<number>;
}> | o.IColumn<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName2";
    readonly assertDelegate: sd.AssertDelegate<number | null>;
}>;
