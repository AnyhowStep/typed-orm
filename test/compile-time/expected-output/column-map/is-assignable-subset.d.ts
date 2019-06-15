import * as o from "../../../../dist/src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
};
export declare const emptyColumnMap: {};
export declare const unitColumnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
};
export declare const unrelatedColumnMap: {
    readonly a: o.Column<{
        tableAlias: "someTable";
        name: "a";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
};
export declare const unrelatedColumnMap2: {
    readonly x: o.Column<{
        tableAlias: "someOtherTable";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
};
export declare const untypedColumnMap: o.ColumnMap;
export declare const isAssignableSubset: [o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof columnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof emptyColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof unitColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof unrelatedColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof unrelatedColumnMap2>, o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof untypedColumnMap>];
export declare const isAssignableSubsetCheck: [true, false, false, false, false, boolean];
export declare const isAssignableSubsetCheck2: typeof isAssignableSubset;
export declare const emptyIsAssignableSubset: [o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof columnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof emptyColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof unitColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof unrelatedColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof unrelatedColumnMap2>, o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof untypedColumnMap>];
export declare const emptyIsAssignableSubsetCheck: [true, true, true, true, true, true];
export declare const emptyIsAssignableSubsetCheck2: typeof emptyIsAssignableSubset;
export declare const unitIsAssignableSubset: [o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof columnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof emptyColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof unitColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof unrelatedColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof unrelatedColumnMap2>, o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof untypedColumnMap>];
export declare const unitIsAssignableSubsetCheck: [true, false, true, false, false, boolean];
export declare const unitIsAssignableSubsetCheck2: typeof unitIsAssignableSubset;
export declare const untypedIsAssignableSubset: [o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof columnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof emptyColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof unitColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof unrelatedColumnMap>, o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof unrelatedColumnMap2>, o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof untypedColumnMap>];
export declare const untypedIsAssignableSubsetCheck: [boolean, boolean, boolean, boolean, boolean, boolean];
export declare const untypedIsAssignableSubsetCheck2: typeof untypedIsAssignableSubset;
