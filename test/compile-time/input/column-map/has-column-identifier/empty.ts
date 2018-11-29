import * as o from "../../../../../src/main";

export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {}
);

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
    false,
    //Correct-Wrong
    false,
    //Correct-String
    false
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
    false,
    //Wrong-Wrong
    false,
    //Wrong-String
    false
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
    false,
    //String-Wrong
    false,
    //String-String
    false
] = hasColumn3;
export const hasColumnCheckReverse3 : typeof hasColumn3 = hasColumnCheck3;
