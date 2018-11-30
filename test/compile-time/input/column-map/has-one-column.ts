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
export const columnMapHasOneColumn : false = o.ColumnMapUtil.hasOneColumn(columnMap);
//This must be an error
export const columnMapHasOneColumn2 : true = o.ColumnMapUtil.hasOneColumn(columnMap);

export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const emptyColumnMapHasOneColumn : false = o.ColumnMapUtil.hasOneColumn(emptyColumnMap);
//This must be an error
export const emptyColumnMapHasOneColumn2 : true = o.ColumnMapUtil.hasOneColumn(emptyColumnMap);

export const unitColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        a : sd.string(),
    }
);
//This must be an error
export const unitColumnMapHasOneColumn : false = o.ColumnMapUtil.hasOneColumn(unitColumnMap);
export const unitColumnMapHasOneColumn2 : true = o.ColumnMapUtil.hasOneColumn(unitColumnMap);

export declare const untypedColumnMap : o.ColumnMap;
//This must be an error
export const untypedColumnMapHasOneColumn : false = o.ColumnMapUtil.hasOneColumn(untypedColumnMap);
//This must be an error
export const untypedColumnMapHasOneColumn2 : true = o.ColumnMapUtil.hasOneColumn(untypedColumnMap);
export const untypedColumnMapHasOneColumn3 : boolean = o.ColumnMapUtil.hasOneColumn(untypedColumnMap);