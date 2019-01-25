import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const item: o.IExprSelectItem<{
    readonly usedRef: {
        someTable: {
            someColumn: o.IColumn<{
                tableAlias: "someTable";
                name: "someColumn";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    readonly assertDelegate: sd.AssertDelegate<Date>;
    readonly tableAlias: "someTableAlias";
    readonly alias: "someAlias";
}>;
export declare const c: o.Column<{
    readonly tableAlias: "someTableAlias";
    readonly name: "someAlias";
    readonly assertDelegate: sd.AssertDelegate<Date>;
}>;
export declare const c2: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<string>;
}>;
export declare const c3: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<string>;
}>;
