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
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
}>;
export declare const c3: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
}>;
export declare const c4: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "columnName";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, string | null>;
}>;
export declare const c6: o.Column<{
    readonly tableAlias: "tableAliasA";
    readonly name: "nameA";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
}> | o.Column<{
    readonly tableAlias: "tableAliasA";
    readonly name: "nameA";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, string | null>;
}>;
