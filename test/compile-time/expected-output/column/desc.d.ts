import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const desc: [o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
}>, "DESC"];
