/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const fromJoin: (o.Column<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
}> | o.Column<{
    tableAlias: "someTable";
    name: "y";
    assertDelegate: sd.AssertDelegate<Date> & {
        __accepts: Date;
        __canAccept: string | number | Date;
    };
}> | o.Column<{
    tableAlias: "someTable";
    name: "z";
    assertDelegate: sd.AssertDelegate<Buffer> & {
        __accepts: Buffer;
        __canAccept: Buffer;
    };
}>)[];
export declare const fromNullableJoin: (o.Column<{
    readonly tableAlias: "someTable";
    readonly name: "x";
    readonly assertDelegate: sd.AssertDelegate<number | null>;
}> | o.Column<{
    readonly tableAlias: "someTable";
    readonly name: "y";
    readonly assertDelegate: sd.AssertDelegate<Date | null>;
}> | o.Column<{
    readonly tableAlias: "someTable";
    readonly name: "z";
    readonly assertDelegate: sd.AssertDelegate<Buffer | null>;
}>)[];
