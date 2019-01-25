import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const c: o.Column<{
    tableAlias: string;
    name: string;
    assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
}>;
export declare const c2: {
    readonly tableAlias: string;
    readonly name: string;
};
export declare const c3: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: sd.AssertDelegate<string>;
}>;
export declare const c4: {
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
};
