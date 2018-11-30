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
    readonly [x: string]: o.Column<{
        readonly tableAlias: string;
        readonly name: string;
        readonly assertDelegate: sd.AssertDelegate<any>;
    }>;
};
export declare const item: o.IExprSelectItem<{
    readonly usedRef: {
        someTable: {
            someColumn: o.IColumn<{
                tableAlias: "someTable";
                name: "someColumn";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    readonly assertDelegate: sd.AssertDelegate<Date>;
    readonly tableAlias: "someTableAlias";
    readonly alias: "someAlias";
}>;
export declare const itemColumnMap: {
    readonly someAlias: o.Column<{
        readonly tableAlias: "someTableAlias";
        readonly name: "someAlias";
        readonly assertDelegate: sd.AssertDelegate<Date>;
    }>;
};
export declare const untypedItem: o.IExprSelectItem;
export declare const untypedItemColumnMap: {
    readonly [x: string]: o.Column<{
        readonly tableAlias: string;
        readonly name: string;
        readonly assertDelegate: sd.AssertDelegate<any>;
    }>;
};
