import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const column: o.Column<{
    readonly tableAlias: "tableA";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<string | number>;
}>;
export declare const subTypeColumn: o.Column<{
    readonly tableAlias: "tableA";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const superTypeColumn: o.Column<{
    readonly tableAlias: "tableA";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<string | number | Date>;
}>;
export declare const unrelatedColumn: o.Column<{
    readonly tableAlias: "tableB";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<string | number>;
}>;
export declare const unrelatedColumn2: o.Column<{
    readonly tableAlias: "tableA";
    readonly name: "nameB";
    readonly assertDelegate: sd.AssertDelegate<string | number>;
}>;
export declare const untypedColumn: o.IColumn;
export declare const assignableTo: [o.ColumnUtil.IsAssignableTo<typeof column, typeof column>, o.ColumnUtil.IsAssignableTo<typeof column, typeof subTypeColumn>, o.ColumnUtil.IsAssignableTo<typeof column, typeof superTypeColumn>, o.ColumnUtil.IsAssignableTo<typeof column, typeof unrelatedColumn>, o.ColumnUtil.IsAssignableTo<typeof column, typeof unrelatedColumn2>, o.ColumnUtil.IsAssignableTo<typeof column, typeof untypedColumn>];
export declare const assignableToCheck: [true, false, true, false, false, boolean];
export declare const assignableToCheck2: typeof assignableTo;
export declare const subTypeAssignableTo: [o.ColumnUtil.IsAssignableTo<typeof subTypeColumn, typeof column>, o.ColumnUtil.IsAssignableTo<typeof subTypeColumn, typeof subTypeColumn>, o.ColumnUtil.IsAssignableTo<typeof subTypeColumn, typeof superTypeColumn>, o.ColumnUtil.IsAssignableTo<typeof subTypeColumn, typeof unrelatedColumn>, o.ColumnUtil.IsAssignableTo<typeof subTypeColumn, typeof unrelatedColumn2>, o.ColumnUtil.IsAssignableTo<typeof subTypeColumn, typeof untypedColumn>];
export declare const subTypeAssignableToCheck: [true, true, true, false, false, boolean];
export declare const subTypeAssignableToCheck2: typeof subTypeAssignableTo;
export declare const superTypeAssignableTo: [o.ColumnUtil.IsAssignableTo<typeof superTypeColumn, typeof column>, o.ColumnUtil.IsAssignableTo<typeof superTypeColumn, typeof subTypeColumn>, o.ColumnUtil.IsAssignableTo<typeof superTypeColumn, typeof superTypeColumn>, o.ColumnUtil.IsAssignableTo<typeof superTypeColumn, typeof unrelatedColumn>, o.ColumnUtil.IsAssignableTo<typeof superTypeColumn, typeof unrelatedColumn2>, o.ColumnUtil.IsAssignableTo<typeof superTypeColumn, typeof untypedColumn>];
export declare const superTypeAssignableToCheck: [false, false, true, false, false, boolean];
export declare const superTypeAssignableToCheck2: typeof superTypeAssignableTo;
