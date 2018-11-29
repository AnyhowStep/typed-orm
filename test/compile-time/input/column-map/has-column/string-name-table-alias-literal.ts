import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";

export const columnMap = {
    ax : o.column("tableA", "ax", sd.naturalNumber()),
    ay : o.column("tableA", "ay", sd.date()),
    bx : o.column("tableB", "bx", sd.buffer()),
    by : o.column("tableB", "by", sd.boolean()),
};

type HasColumn<DataT extends o.ColumnData> = o.ColumnMapUtil.HasColumn<
    typeof columnMap,
    o.IColumn<DataT>
>;

export declare const hasColumn : [
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<Buffer>,
    }>,
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>,
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "tableA",
        name : string,
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck : [
    //number
    boolean,
    //Date
    boolean,
    //Buffer
    false,
    //boolean
    false,
    //string
    false,
    //any
    boolean,
    //unknown
    false
] = hasColumn;
export const hasColumnCheckReverse : typeof hasColumn = hasColumnCheck;
