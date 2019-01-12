import { ITable, TableUtil } from "../table";
import { RawExprNoUsedRef } from "../raw-expr";
import * as InsertUtil from "./util";
import { IConnection } from "../execution";
import { TypeMapUtil } from "../type-map";
export declare type InsertRow<TableT extends ITable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>);
});
export declare type InsertRowLiteral<TableT extends ITable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
});
export declare enum InsertModifier {
    IGNORE = "IGNORE",
    REPLACE = "REPLACE"
}
export interface InsertData {
    readonly _table: ITable & {
        insertAllowed: true;
    };
    readonly _values: InsertRow<ITable>[] | undefined;
    readonly _modifier: InsertModifier | undefined;
}
export interface IInsert<DataT extends InsertData = InsertData> {
    readonly _table: DataT["_table"];
    readonly _values: DataT["_values"];
    readonly _modifier: DataT["_modifier"];
}
export declare class Insert<DataT extends InsertData> implements IInsert<DataT> {
    readonly _table: DataT["_table"];
    readonly _values: DataT["_values"];
    readonly _modifier: DataT["_modifier"];
    constructor(data: DataT);
    ignore(): InsertUtil.Ignore<this>;
    replace(): InsertUtil.Replace<this>;
    values(...values: InsertRow<this["_table"]>[]): InsertUtil.Values<this>;
    execute(this: Extract<this, IInsert & {
        _values: InsertRow<ITable>[];
    }>, connection: IConnection): (Promise<InsertUtil.Execute<Extract<this, IInsert & {
        _values: InsertRow<ITable>[];
    }>>>);
    executeAndFetch(this: Extract<this, IInsert & {
        _values: InsertRow<ITable>[];
    }>, connection: (IConnection & TableUtil.AssertHasCandidateKey<this["_table"]>)): (Promise<TypeMapUtil.FromTable<this["_table"]>>);
    printSql(this: Extract<this, IInsert & {
        _values: InsertRow<ITable>[];
    }>): this;
}
export declare type ExecutableInsert = IInsert<{
    readonly _table: ITable & {
        insertAllowed: true;
    };
    readonly _values: InsertRow<ITable>[];
    readonly _modifier: InsertModifier | undefined;
}>;
//# sourceMappingURL=insert.d.ts.map