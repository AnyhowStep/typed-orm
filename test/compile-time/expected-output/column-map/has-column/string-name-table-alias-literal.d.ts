import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMap: {
    ax: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ax";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    ay: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ay";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    bx: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "bx";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
    by: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "by";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
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
