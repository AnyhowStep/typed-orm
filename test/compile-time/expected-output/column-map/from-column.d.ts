import * as o from "../../../../dist/src/main";
export declare const column: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "name";
    readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
}>;
export declare const columnMap: {
    readonly name: o.Column<{
        readonly tableAlias: "tableAlias";
        readonly name: "name";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
};
export declare const untypedColumn: o.IColumn;
export declare const untypedColumnMap: {
    readonly [x: string]: o.IColumn<o.ColumnData>;
};
