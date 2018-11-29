import * as o from "../../../../../src/main";

export declare const columnMap : o.ColumnMap;

type HasColumnIdentifier<ColumnIdentifierT extends o.ColumnIdentifier> = o.ColumnMapUtil.HasColumnIdentifier<
    typeof columnMap,
    ColumnIdentifierT
>;
/*
    tableAlias : correct ("someTable"), wrong, string
    name : correct ("x"), wrong, string,

    3 * 3 = 9
*/
export declare const hasColumn : [
    HasColumnIdentifier<{
        tableAlias : "someTable",
        name : "x",
    }>,
    HasColumnIdentifier<{
        tableAlias : "someTable",
        name : "doesNotExist",
    }>,
    HasColumnIdentifier<{
        tableAlias : "someTable",
        name : string,
    }>
];
export const hasColumnCheck : [
    //Correct-Correct
    boolean,
    //Correct-Wrong
    boolean,
    //Correct-String
    boolean
] = hasColumn;
export const hasColumnCheckReverse : typeof hasColumn = hasColumnCheck;

export declare const hasColumn2 : [
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : "x",
    }>,
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
    }>,
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : string,
    }>
];
export const hasColumnCheck2 : [
    //Wrong-Correct
    boolean,
    //Wrong-Wrong
    boolean,
    //Wrong-String
    boolean
] = hasColumn2;
export const hasColumnCheckReverse2 : typeof hasColumn2 = hasColumnCheck2;


export declare const hasColumn3 : [
    HasColumnIdentifier<{
        tableAlias : string,
        name : "x",
    }>,
    HasColumnIdentifier<{
        tableAlias : string,
        name : "doesNotExist",
    }>,
    HasColumnIdentifier<{
        tableAlias : string,
        name : string,
    }>
];
export const hasColumnCheck3 : [
    //String-Correct
    boolean,
    //String-Wrong
    boolean,
    //String-String
    boolean
] = hasColumn3;
export const hasColumnCheckReverse3 : typeof hasColumn3 = hasColumnCheck3;
