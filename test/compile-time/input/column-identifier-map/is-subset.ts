import * as o from "../../../../dist/src/main";

export declare const mapA : {
    ax : {
        tableAlias : "tableA",
        name : "ax"
    },
    ay : {
        tableAlias : "tableA",
        name : "ay"
    },
};
export declare const subMapA : {
    ax : {
        tableAlias : "tableA",
        name : "ax"
    },
};
export declare const notSubMapA : {
    ax : {
        tableAlias : "tableA",
        name : "qwerty"
    },
};
export declare const unrelatedMap : {
    columnName : {
        tableAlias : "tableA",
        name : "qwerty123123"
    },
};
export declare const stringMap : o.ColumnIdentifierMap;

export const checkMapA = o.ColumnIdentifierMapUtil.isSubset(
    mapA,
    mapA
);
export const checkSubMapA = o.ColumnIdentifierMapUtil.isSubset(
    subMapA,
    mapA
);
export const checkNotSubMapA = o.ColumnIdentifierMapUtil.isSubset(
    notSubMapA,
    mapA
);
export const checkUnrelatedMap = o.ColumnIdentifierMapUtil.isSubset(
    unrelatedMap,
    mapA
);
export const checkStringMap = o.ColumnIdentifierMapUtil.isSubset(
    stringMap,
    mapA
);


export const checkMapA2 = o.ColumnIdentifierMapUtil.isSubset(
    mapA,
    mapA
);
export const checkSubMapA2 = o.ColumnIdentifierMapUtil.isSubset(
    mapA,
    subMapA
);
export const checkNotSubMapA2 = o.ColumnIdentifierMapUtil.isSubset(
    mapA,
    notSubMapA
);
export const checkUnrelatedMap2 = o.ColumnIdentifierMapUtil.isSubset(
    mapA,
    unrelatedMap
);
export const checkStringMap2 = o.ColumnIdentifierMapUtil.isSubset(
    mapA,
    stringMap
);