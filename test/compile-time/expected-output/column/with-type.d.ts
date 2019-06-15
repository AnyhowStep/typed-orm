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
export declare const c2: o.Column<{
    readonly tableAlias: string;
    readonly name: string;
    readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
}>;
export declare const c3: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
}>;
export declare const c4: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, Date>;
}>;
