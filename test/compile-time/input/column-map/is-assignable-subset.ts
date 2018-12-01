import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);
export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const unitColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
    }
);
export const unrelatedColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        a : sd.naturalNumber(),
    }
);
export const unrelatedColumnMap2 = o.ColumnMapUtil.fromAssertMap(
    "someOtherTable",
    {
        x : sd.naturalNumber(),
    }
);
export declare const untypedColumnMap : o.ColumnMap;

export declare const isAssignableSubset : [
    o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof columnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof emptyColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof unitColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof unrelatedColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof unrelatedColumnMap2>,
    o.ColumnMapUtil.IsAssignableSubset<typeof columnMap, typeof untypedColumnMap>
];
export const isAssignableSubsetCheck : [
    true,
    false,
    false,
    false,
    false,
    boolean
] = isAssignableSubset;
export const isAssignableSubsetCheck2 : typeof isAssignableSubset = isAssignableSubsetCheck;

export declare const emptyIsAssignableSubset : [
    o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof columnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof emptyColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof unitColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof unrelatedColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof unrelatedColumnMap2>,
    o.ColumnMapUtil.IsAssignableSubset<typeof emptyColumnMap, typeof untypedColumnMap>
];
export const emptyIsAssignableSubsetCheck : [
    true,
    true,
    true,
    true,
    true,
    true
] = emptyIsAssignableSubset;
export const emptyIsAssignableSubsetCheck2 : typeof emptyIsAssignableSubset = emptyIsAssignableSubsetCheck;

export declare const unitIsAssignableSubset : [
    o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof columnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof emptyColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof unitColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof unrelatedColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof unrelatedColumnMap2>,
    o.ColumnMapUtil.IsAssignableSubset<typeof unitColumnMap, typeof untypedColumnMap>
];
export const unitIsAssignableSubsetCheck : [
    true,
    false,
    true,
    false,
    false,
    boolean
] = unitIsAssignableSubset;
export const unitIsAssignableSubsetCheck2 : typeof unitIsAssignableSubset = unitIsAssignableSubsetCheck;

export declare const untypedIsAssignableSubset : [
    o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof columnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof emptyColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof unitColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof unrelatedColumnMap>,
    o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof unrelatedColumnMap2>,
    o.ColumnMapUtil.IsAssignableSubset<typeof untypedColumnMap, typeof untypedColumnMap>
];
export const untypedIsAssignableSubsetCheck : [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
] = untypedIsAssignableSubset;
export const untypedIsAssignableSubsetCheck2 : typeof untypedIsAssignableSubset = untypedIsAssignableSubsetCheck;