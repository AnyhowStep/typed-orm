import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const aliased: o.IExprSelectItem<{
    readonly usedRef: {
        readonly tableAlias: {
            readonly columnName: o.Column<{
                readonly tableAlias: "tableAlias";
                readonly name: "columnName";
                readonly assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        };
    };
    readonly assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
    readonly tableAlias: "tableAlias";
    readonly alias: "newColumnName";
}>;
