/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: sd.AssertDelegate<Date>;
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
export declare const columnArray: (o.Column<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<number>;
}> | o.Column<{
    tableAlias: "someTable";
    name: "y";
    assertDelegate: sd.AssertDelegate<Date>;
}> | o.Column<{
    tableAlias: "someTable";
    name: "z";
    assertDelegate: sd.AssertDelegate<Buffer>;
}>)[];
export declare const emptyColumnMap: {};
export declare const emptyColumnArray: never[];
export declare const mixedColumnMap: {
    readonly ax: o.Column<{
        tableAlias: "tableA";
        name: "ax";
        assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly ay: o.Column<{
        tableAlias: "tableA";
        name: "ay";
        assertDelegate: sd.AssertDelegate<string>;
    }>;
} & {
    readonly bx: o.Column<{
        tableAlias: "tableB";
        name: "bx";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly by: o.Column<{
        tableAlias: "tableB";
        name: "by";
        assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
export declare const mixedColumnArray: (o.Column<{
    tableAlias: "tableA";
    name: "ax";
    assertDelegate: sd.AssertDelegate<number>;
}> | o.Column<{
    tableAlias: "tableA";
    name: "ay";
    assertDelegate: sd.AssertDelegate<string>;
}> | o.Column<{
    tableAlias: "tableB";
    name: "bx";
    assertDelegate: sd.AssertDelegate<boolean>;
}> | o.Column<{
    tableAlias: "tableB";
    name: "by";
    assertDelegate: sd.AssertDelegate<Buffer>;
}>)[];
