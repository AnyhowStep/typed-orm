import { ITable } from "../table";
import { ISelectBuilder, AnySelectBuilder } from "../select-builder";
import { IColumn, AnyColumn } from "../column";
import { TypeOf } from "../column-collection";
import { ColumnOfReferences } from "../column-references-operation";
import * as mysql from "typed-mysql";
import { Querify } from "../querify";
import { AllowedExprConstants } from "../expr";
export interface AnyInsertSelectBuilderData {
    readonly table: ITable<any, any, any, any>;
    readonly selectBuilder: AnySelectBuilder;
    readonly ignore: boolean;
    readonly columns: undefined | {
        [name: string]: AnyColumn | AllowedExprConstants;
    };
}
export declare type InsertColumnsCallback<DataT extends AnyInsertSelectBuilderData> = (DataT["table"] extends ITable<any, any, infer RawColumnCollectionT, infer TableDataT> ? (DataT["selectBuilder"] extends ISelectBuilder<infer SelectDataT> ? (s: SelectDataT["selectReferences"]) => ({
    [name in Exclude<keyof RawColumnCollectionT, keyof TableDataT["hasServerDefaultValue"]>]: ((ColumnOfReferences<SelectDataT["selectReferences"]> & IColumn<any, any, TypeOf<RawColumnCollectionT[name]>>) | (TypeOf<RawColumnCollectionT[name]>));
} & {
    [name in Extract<keyof TableDataT["hasServerDefaultValue"], string>]?: (((ColumnOfReferences<SelectDataT["selectReferences"]> & IColumn<any, any, TypeOf<RawColumnCollectionT[name]>>) | undefined) | (TypeOf<RawColumnCollectionT[name]> | undefined));
}) : (never)) : (never));
export interface IInsertSelectBuilder<DataT extends AnyInsertSelectBuilderData> extends Querify {
    readonly data: DataT;
    ignore(): IInsertSelectBuilder<{
        table: DataT["table"];
        selectBuilder: DataT["selectBuilder"];
        ignore: true;
        columns: DataT["columns"];
    }>;
    ignore<IgnoreT extends boolean>(ignore: IgnoreT): IInsertSelectBuilder<{
        table: DataT["table"];
        selectBuilder: DataT["selectBuilder"];
        ignore: IgnoreT;
        columns: DataT["columns"];
    }>;
    columns<InsertColumnsCallbackT extends InsertColumnsCallback<DataT>>(columnsCallback: InsertColumnsCallbackT): IInsertSelectBuilder<{
        table: DataT["table"];
        selectBuilder: DataT["selectBuilder"];
        ignore: DataT["ignore"];
        columns: ReturnType<InsertColumnsCallbackT>;
    }>;
    execute(this: IInsertSelectBuilder<{
        table: any;
        selectBuilder: any;
        ignore: any;
        columns: {
            [name: string]: AnyColumn | AllowedExprConstants;
        };
    }>): (DataT["table"] extends ITable<any, any, any, infer TableDataT> ? (mysql.MysqlInsertResult & (TableDataT["autoIncrement"] extends AnyColumn ? {
        [name in TableDataT["autoIncrement"]["name"]]: (DataT["ignore"] extends true ? number | undefined : number);
    } : {})) : ("Could not infer TableDataT of table" | void | never));
}
export declare type CreateInsertSelectBuilderDelegate = (<TableT extends ITable<any, any, any, any>, SelectBuilderT extends AnySelectBuilder>(table: TableT, selectBuilder: SelectBuilderT) => (IInsertSelectBuilder<{
    table: TableT;
    selectBuilder: SelectBuilderT;
    ignore: false;
    columns: undefined;
}>));
