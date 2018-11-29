import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";

export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);

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
    true,
    //Correct-Correct-WrongInUnion
    false,
    //Correct-Correct-WrongOutUnion
    false,
    //Correct-Correct-Any
    boolean,
    //Correct-Correct-Unknown
    false
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
    false,
    //Correct-Wrong-WrongInUnion
    false,
    //Correct-Wrong-WrongOutUnion
    false,
    //Correct-Wrong-Any
    false,
    //Correct-Wrong-Unknown
    false
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
    false,
    //Correct-String-Any
    boolean,
    //Correct-String-Unknown
    false
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
    false,
    //Wrong-Correct-WrongInUnion
    false,
    //Wrong-Correct-WrongOutUnion
    false,
    //Wrong-Correct-Any
    false,
    //Wrong-Correct-Unknown
    false
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
    false,
    //Wrong-Wrong-WrongInUnion
    false,
    //Wrong-Wrong-WrongOutUnion
    false,
    //Wrong-Wrong-Any
    false,
    //Wrong-Wrong-Unknown
    false
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
    false,
    //Wrong-String-WrongInUnion
    false,
    //Wrong-String-WrongOutUnion
    false,
    //Wrong-String-Any
    false,
    //Wrong-String-Unknown
    false
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
    false,
    //String-Correct-WrongOutUnion
    false,
    //String-Correct-Any
    boolean,
    //String-Correct-Unknown
    false
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
    false,
    //String-Wrong-WrongInUnion
    false,
    //String-Wrong-WrongOutUnion
    false,
    //String-Wrong-Any
    false,
    //String-Wrong-Unknown
    false
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
    false,
    //String-String-Any
    boolean,
    //String-String-Unknown
    false
] = hasColumn9;
export const hasColumnCheckReverse9 : typeof hasColumn9 = hasColumnCheck9;