import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const column: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
}>;
export declare const columnMap: {
    readonly name: o.Column<{
        readonly tableAlias: "tableAlias";
        readonly name: "name";
        readonly assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
};
export declare const untypedColumn: o.IColumn;
export declare const untypedColumnMap: {
    readonly [x: string]: o.IColumn<o.ColumnData>;
};
