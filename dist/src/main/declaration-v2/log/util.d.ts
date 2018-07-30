import * as sd from "schema-decorator";
import { LogData } from "./log-data";
import { PooledDatabase } from "../PooledDatabase";
import { ColumnCollectionUtil } from "../column-collection";
import { RawExprUtil, AllowedExprConstant } from "../raw-expr";
import { Table, TableRow, TableUtil } from "../table";
import { Column } from "../column";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
export declare namespace LogDataUtil {
    type EntityIdentifier<DataT extends LogData> = ({
        [columnName in Extract<Extract<keyof DataT["table"]["columns"], keyof DataT["entityIdentifier"]>, string>]: (ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>);
    });
    function entityIdentifierAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<EntityIdentifier<DataT>>;
    type Trackable<DataT extends LogData> = ({
        [columnName in Extract<Extract<keyof DataT["table"]["columns"], keyof DataT["isTrackable"]>, string>]?: (ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>);
    });
    type FullOverwriteTrackable<DataT extends LogData> = ({
        [columnName in Extract<Extract<keyof DataT["table"]["columns"], keyof DataT["isTrackable"]>, string>]: (ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>);
    });
    function trackableAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<Trackable<DataT>>;
    type DoNotCopyOnTrackableChanged<DataT extends LogData> = ({
        [name in Extract<TableUtil.RequiredColumnNames<DataT["table"]>, Extract<keyof DataT["doNotCopyOnTrackableChanged"], string>>]: (ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>);
    } & {
        [name in Extract<TableUtil.OptionalColumnNames<DataT["table"]>, Extract<keyof DataT["doNotCopyOnTrackableChanged"], string>>]?: (ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>);
    });
    function doNotCopyOnTrackableChangedAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<DoNotCopyOnTrackableChanged<DataT>>;
    type InsertIfDifferentRow<DataT extends LogData> = (Trackable<DataT> & DoNotCopyOnTrackableChanged<DataT>);
    type FullOverwriteInsertIfDifferentRow<DataT extends LogData> = (FullOverwriteTrackable<DataT> & DoNotCopyOnTrackableChanged<DataT>);
    function insertIfDifferentRowAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<InsertIfDifferentRow<DataT>>;
    function fetchLatestOrError<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    function fetchLatestOrUndefined<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]> | undefined>;
    function fetchLatestOrDefault<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    function insertIfDifferentAndFetch<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>, insertIfDifferentRow: InsertIfDifferentRow<DataT>): Promise<{
        latest: TableRow<DataT["table"]>;
        wasInserted: boolean;
    }>;
    type LatestValueExpressionEntityTable<DataT extends LogData> = (Table<any, any, {
        [entityKey in keyof DataT["entityIdentifier"]]: (entityKey extends keyof DataT["table"]["columns"] ? Column<any, any, sd.TypeOf<DataT["table"]["columns"][entityKey]["assertDelegate"]>> : never);
    }, any>);
    type LatestValueExpressionValueDelegate<DataT extends LogData, EntityT extends LatestValueExpressionEntityTable<DataT>> = ((c: (ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]> & ColumnCollectionUtil.ToColumnReferences<DataT["table"]["columns"]>)) => (ColumnReferencesUtil.Columns<ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]> & ColumnCollectionUtil.ToColumnReferences<DataT["table"]["columns"]>> | Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]> & ColumnCollectionUtil.ToColumnReferences<DataT["table"]["columns"]>>, any> | AllowedExprConstant));
    type LatestValueExpressionDefaultValueDelegate<DataT extends LogData, EntityT extends LatestValueExpressionEntityTable<DataT>> = ((c: ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]>) => (ColumnReferencesUtil.Columns<ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]>> | Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]>>, any> | AllowedExprConstant));
    type LatestValueExpression<DataT extends LogData, EntityT extends LatestValueExpressionEntityTable<DataT>, ValueDelegateT extends LatestValueExpressionValueDelegate<DataT, EntityT>, DefaultValueDelegateT extends LatestValueExpressionDefaultValueDelegate<DataT, EntityT>> = (Expr<({
        [table in Exclude<keyof RawExprUtil.UsedReferences<ReturnType<ValueDelegateT>>, DataT["table"]["alias"]>]: (RawExprUtil.UsedReferences<ReturnType<ValueDelegateT>>[table]);
    } & RawExprUtil.UsedReferences<ReturnType<DefaultValueDelegateT>>), (RawExprUtil.Type<ReturnType<ValueDelegateT>> | RawExprUtil.Type<ReturnType<DefaultValueDelegateT>>)>);
    function latestValueExpression<DataT extends LogData, EntityT extends LatestValueExpressionEntityTable<DataT>, ValueDelegateT extends LatestValueExpressionValueDelegate<DataT, EntityT>, DefaultValueDelegateT extends LatestValueExpressionDefaultValueDelegate<DataT, EntityT>>(db: PooledDatabase, data: DataT, entity: EntityT, valueDelegate: ValueDelegateT, defaultValueDelegate: DefaultValueDelegateT): LatestValueExpression<DataT, EntityT, ValueDelegateT, DefaultValueDelegateT>;
}
export declare type Trackable<DataT extends LogData> = LogDataUtil.Trackable<DataT>;
