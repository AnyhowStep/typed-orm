import * as o from "../../../../dist/src/main";

export declare const ax : {
    tableAlias : "tableA",
    name : "ax",
};
export declare const ay : {
    tableAlias : "tableA",
    name : "ay",
};
export declare const bx : {
    tableAlias : "tableB",
    name : "bx",
};
export declare const by : {
    tableAlias : "tableB",
    name : "by",
};
export declare const stringTableAlias : {
    tableAlias : string,
    name : "ax",
};
export declare const stringName : {
    tableAlias : "tableA",
    name : string,
};
export declare const stringBoth : {
    tableAlias : string,
    name : string,
};

export const axEquality : [
    true,
    false,
    false,
    false,
    boolean,
    boolean,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(ax, ax),
    o.ColumnIdentifierUtil.isEqual(ax, ay),
    o.ColumnIdentifierUtil.isEqual(ax, bx),
    o.ColumnIdentifierUtil.isEqual(ax, by),
    o.ColumnIdentifierUtil.isEqual(ax, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(ax, stringName),
    o.ColumnIdentifierUtil.isEqual(ax, stringBoth),
];
export const axEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof stringBoth>
] = axEquality;

export const ayEquality : [
    false,
    true,
    false,
    false,
    boolean,
    boolean,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(ay, ax),
    o.ColumnIdentifierUtil.isEqual(ay, ay),
    o.ColumnIdentifierUtil.isEqual(ay, bx),
    o.ColumnIdentifierUtil.isEqual(ay, by),
    o.ColumnIdentifierUtil.isEqual(ay, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(ay, stringName),
    o.ColumnIdentifierUtil.isEqual(ay, stringBoth),
];
export const ayEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof stringBoth>
] = ayEquality;

export const bxEquality : [
    false,
    false,
    true,
    false,
    boolean,
    false,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(bx, ax),
    o.ColumnIdentifierUtil.isEqual(bx, ay),
    o.ColumnIdentifierUtil.isEqual(bx, bx),
    o.ColumnIdentifierUtil.isEqual(bx, by),
    o.ColumnIdentifierUtil.isEqual(bx, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(bx, stringName),
    o.ColumnIdentifierUtil.isEqual(bx, stringBoth),
];
export const bxEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof stringBoth>
] = bxEquality;

export const byEquality : [
    false,
    false,
    false,
    true,
    boolean,
    false,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(by, ax),
    o.ColumnIdentifierUtil.isEqual(by, ay),
    o.ColumnIdentifierUtil.isEqual(by, bx),
    o.ColumnIdentifierUtil.isEqual(by, by),
    o.ColumnIdentifierUtil.isEqual(by, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(by, stringName),
    o.ColumnIdentifierUtil.isEqual(by, stringBoth),
];
export const byEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof by, typeof stringBoth>
] = byEquality;

export const stringTableAliasEquality : [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, ax),
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, ay),
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, bx),
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, by),
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, stringName),
    o.ColumnIdentifierUtil.isEqual(stringTableAlias, stringBoth),
];
export const stringTableAliasEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof stringBoth>
] = stringTableAliasEquality;

export const stringNameEquality : [
    boolean,
    boolean,
    false,
    false,
    boolean,
    boolean,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(stringName, ax),
    o.ColumnIdentifierUtil.isEqual(stringName, ay),
    o.ColumnIdentifierUtil.isEqual(stringName, bx),
    o.ColumnIdentifierUtil.isEqual(stringName, by),
    o.ColumnIdentifierUtil.isEqual(stringName, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(stringName, stringName),
    o.ColumnIdentifierUtil.isEqual(stringName, stringBoth),
];
export const stringNameEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof stringBoth>
] = stringNameEquality;


export const stringBothEquality : [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
] = [
    o.ColumnIdentifierUtil.isEqual(stringBoth, ax),
    o.ColumnIdentifierUtil.isEqual(stringBoth, ay),
    o.ColumnIdentifierUtil.isEqual(stringBoth, bx),
    o.ColumnIdentifierUtil.isEqual(stringBoth, by),
    o.ColumnIdentifierUtil.isEqual(stringBoth, stringTableAlias),
    o.ColumnIdentifierUtil.isEqual(stringBoth, stringName),
    o.ColumnIdentifierUtil.isEqual(stringBoth, stringBoth),
];
export const stringBothEquality2 : [
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof ax>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof ay>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof bx>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof by>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof stringTableAlias>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof stringName>,
    o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof stringBoth>
] = stringBothEquality;