import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const result: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName2";
    readonly assertDelegate: sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: number | null;
    };
}>;
