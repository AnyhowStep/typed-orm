import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";

export declare const columnMap : o.ColumnMap;

type HasColumn<DataT extends o.ColumnData> = o.ColumnMapUtil.HasColumn<
    typeof columnMap,
    o.IColumn<DataT>
>;
/*
    tableAlias : correct ("someTable"), wrong, string
    name : correct ("x"), wrong, string,
    assertDelegate : correct (number), wrong-in-union, wrong-out-of-union, any, unknown

    3 * 3 * 5 = 45
*/
export declare const hasColumn : [
    HasColumn<{
        tableAlias : "someTable",
        name : "x",
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "x",
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "x",
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "x",
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "x",
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck : [
    //Correct-Correct-Correct
    boolean,
    //Correct-Correct-WrongInUnion
    boolean,
    //Correct-Correct-WrongOutUnion
    boolean,
    //Correct-Correct-Any
    boolean,
    //Correct-Correct-Unknown
    boolean
] = hasColumn;
export const hasColumnCheckReverse : typeof hasColumn = hasColumnCheck;

export declare const hasColumn2 : [
    HasColumn<{
        tableAlias : "someTable",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck2 : [
    //Correct-Wrong-Correct
    boolean,
    //Correct-Wrong-WrongInUnion
    boolean,
    //Correct-Wrong-WrongOutUnion
    boolean,
    //Correct-Wrong-Any
    boolean,
    //Correct-Wrong-Unknown
    boolean
] = hasColumn2;
export const hasColumnCheckReverse2 : typeof hasColumn2 = hasColumnCheck2;

export declare const hasColumn3 : [
    HasColumn<{
        tableAlias : "someTable",
        name : string,
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : string,
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : string,
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : string,
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "someTable",
        name : string,
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck3 : [
    //Correct-String-Correct
    boolean,
    //Correct-String-WrongInUnion
    boolean,
    //Correct-String-WrongOutUnion
    boolean,
    //Correct-String-Any
    boolean,
    //Correct-String-Unknown
    boolean
] = hasColumn3;
export const hasColumnCheckReverse3 : typeof hasColumn3 = hasColumnCheck3;

///////////////////////////////////////////////////////
export declare const hasColumn4 : [
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "x",
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "x",
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "x",
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "x",
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "x",
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck4 : [
    //Wrong-Correct-Correct
    boolean,
    //Wrong-Correct-WrongInUnion
    boolean,
    //Wrong-Correct-WrongOutUnion
    boolean,
    //Wrong-Correct-Any
    boolean,
    //Wrong-Correct-Unknown
    boolean
] = hasColumn4;
export const hasColumnCheckReverse4 : typeof hasColumn4 = hasColumnCheck4;

export declare const hasColumn5 : [
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck5 : [
    //Wrong-Wrong-Correct
    boolean,
    //Wrong-Wrong-WrongInUnion
    boolean,
    //Wrong-Wrong-WrongOutUnion
    boolean,
    //Wrong-Wrong-Any
    boolean,
    //Wrong-Wrong-Unknown
    boolean
] = hasColumn5;
export const hasColumnCheckReverse5 : typeof hasColumn5 = hasColumnCheck5;

export declare const hasColumn6 : [
    HasColumn<{
        tableAlias : "doesNotExist",
        name : string,
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : string,
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : string,
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : string,
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : "doesNotExist",
        name : string,
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck6 : [
    //Wrong-String-Correct
    boolean,
    //Wrong-String-WrongInUnion
    boolean,
    //Wrong-String-WrongOutUnion
    boolean,
    //Wrong-String-Any
    boolean,
    //Wrong-String-Unknown
    boolean
] = hasColumn6;
export const hasColumnCheckReverse6 : typeof hasColumn6 = hasColumnCheck6;


///////////////////////////////////////////////////////
export declare const hasColumn7 : [
    HasColumn<{
        tableAlias : string,
        name : "x",
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "x",
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "x",
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "x",
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "x",
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck7 : [
    //String-Correct-Correct
    boolean,
    //String-Correct-WrongInUnion
    boolean,
    //String-Correct-WrongOutUnion
    boolean,
    //String-Correct-Any
    boolean,
    //String-Correct-Unknown
    boolean
] = hasColumn7;
export const hasColumnCheckReverse7 : typeof hasColumn7 = hasColumnCheck7;

export declare const hasColumn8 : [
    HasColumn<{
        tableAlias : string,
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : "doesNotExist",
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck8 : [
    //String-Wrong-Correct
    boolean,
    //String-Wrong-WrongInUnion
    boolean,
    //String-Wrong-WrongOutUnion
    boolean,
    //String-Wrong-Any
    boolean,
    //String-Wrong-Unknown
    boolean
] = hasColumn8;
export const hasColumnCheckReverse8 : typeof hasColumn8 = hasColumnCheck8;

export declare const hasColumn9 : [
    HasColumn<{
        tableAlias : string,
        name : string,
        assertDelegate : sd.AssertDelegate<number>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : string,
        assertDelegate : sd.AssertDelegate<Date>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : string,
        assertDelegate : sd.AssertDelegate<string>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : string,
        assertDelegate : sd.AssertDelegate<any>,
    }>,
    HasColumn<{
        tableAlias : string,
        name : string,
        assertDelegate : sd.AssertDelegate<unknown>,
    }>
];
export const hasColumnCheck9 : [
    //String-String-Correct
    boolean,
    //String-String-WrongInUnion
    boolean,
    //String-String-WrongOutUnion
    boolean,
    //String-String-Any
    boolean,
    //String-String-Unknown
    boolean
] = hasColumn9;
export const hasColumnCheckReverse9 : typeof hasColumn9 = hasColumnCheck9;