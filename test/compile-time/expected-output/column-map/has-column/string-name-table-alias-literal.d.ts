/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMap: {
    ax: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ax";
        readonly assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    ay: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ay";
        readonly assertDelegate: sd.AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: string | number | Date;
        };
    }>;
    bx: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "bx";
        readonly assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
    by: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "by";
        readonly assertDelegate: sd.AssertDelegate<boolean> & {
            __accepts: boolean;
            __canAccept: boolean;
        };
    }>;
};
declare type HasColumn<DataT extends o.ColumnData> = o.ColumnMapUtil.HasColumn<typeof columnMap, o.IColumn<DataT>>;
export declare const hasColumn: [HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<Buffer>;
}>, HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<boolean>;
}>, HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "tableA";
    name: string;
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck: [boolean, boolean, false, false, false, boolean, false];
export declare const hasColumnCheckReverse: typeof hasColumn;
export {};
