import * as o from "../../../../dist/src/main";
export declare const ax: {
    tableAlias: "tableA";
    name: "ax";
};
export declare const ay: {
    tableAlias: "tableA";
    name: "ay";
};
export declare const bx: {
    tableAlias: "tableB";
    name: "bx";
};
export declare const by: {
    tableAlias: "tableB";
    name: "by";
};
export declare const stringTableAlias: {
    tableAlias: string;
    name: "ax";
};
export declare const stringName: {
    tableAlias: "tableA";
    name: string;
};
export declare const stringBoth: {
    tableAlias: string;
    name: string;
};
export declare const axEquality: [true, false, false, false, boolean, boolean, boolean];
export declare const axEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof ax, typeof stringBoth>];
export declare const ayEquality: [false, true, false, false, boolean, boolean, boolean];
export declare const ayEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof ay, typeof stringBoth>];
export declare const bxEquality: [false, false, true, false, boolean, false, boolean];
export declare const bxEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof bx, typeof stringBoth>];
export declare const byEquality: [false, false, false, true, boolean, false, boolean];
export declare const byEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof by, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof by, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof by, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof by, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof by, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof by, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof by, typeof stringBoth>];
export declare const stringTableAliasEquality: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
export declare const stringTableAliasEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof stringTableAlias, typeof stringBoth>];
export declare const stringNameEquality: [boolean, boolean, false, false, boolean, boolean, boolean];
export declare const stringNameEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof stringName, typeof stringBoth>];
export declare const stringBothEquality: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
export declare const stringBothEquality2: [o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof ax>, o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof ay>, o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof bx>, o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof by>, o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof stringTableAlias>, o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof stringName>, o.ColumnIdentifierUtil.IsEqual<typeof stringBoth, typeof stringBoth>];
