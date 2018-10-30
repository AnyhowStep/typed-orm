import * as sd from "schema-decorator";
import { LogData } from "./log-data";
import { PooledDatabase } from "../PooledDatabase";
import { ColumnCollectionUtil } from "../column-collection";
import { RawExprUtil, AllowedExprConstant } from "../raw-expr";
import { Table, TableRow, TableUtil } from "../table";
import { Column } from "../column";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
import { SelectBuilderUtil } from "../select-builder-util";
import { RawInsertValueRow } from "../insert-value-builder";
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
    function fullOverwriteTrackableAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<FullOverwriteTrackable<DataT>>;
    type DoNotCopyOnTrackableChanged<DataT extends LogData> = ({
        [name in Extract<TableUtil.RequiredColumnNames<DataT["table"]>, Extract<keyof DataT["doNotCopyOnTrackableChanged"], string>>]: (ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>);
    } & {
        [name in Extract<TableUtil.OptionalColumnNames<DataT["table"]>, Extract<keyof DataT["doNotCopyOnTrackableChanged"], string>>]?: (ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>);
    });
    function doNotCopyOnTrackableChangedAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<DoNotCopyOnTrackableChanged<DataT>>;
    type DoNotModifyOnTrackableChanged<DataT extends LogData> = ({
        [name in Extract<Exclude<keyof DataT["table"]["columns"], ((keyof DataT["doNotCopyOnTrackableChanged"]) | (keyof DataT["isTrackable"]) | (keyof DataT["entityIdentifier"]))>, string>]: (ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>);
    });
    function doNotModifyOnTrackableChangedAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<DoNotModifyOnTrackableChanged<DataT>>;
    type InsertIfDifferentRow<DataT extends LogData> = (Trackable<DataT> & DoNotCopyOnTrackableChanged<DataT>);
    type FullOverwriteInsertIfDifferentRow<DataT extends LogData> = (FullOverwriteTrackable<DataT> & DoNotCopyOnTrackableChanged<DataT>);
    function insertIfDifferentRowAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<InsertIfDifferentRow<DataT>>;
    function fullOverwriteInsertIfDifferentRowAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<FullOverwriteInsertIfDifferentRow<DataT>>;
    function fetchLatestQuery<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): SelectBuilderUtil.CleanToFrom<DataT["table"]>;
    function fetchLatestOrError<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    function fetchLatestOrUndefined<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]> | undefined>;
    function fetchLatestOrDefault<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    function insertIfDifferentAndFetch<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>, insertIfDifferentRow: InsertIfDifferentRow<DataT>): Promise<{
        latest: TableRow<DataT["table"]>;
        wasInserted: boolean;
    }>;
    function insertIfDifferentOrFirstAndFetch<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>, insertIfDifferentRow: InsertIfDifferentRow<DataT>, onFirstDelegate: (db: PooledDatabase, row: InsertIfDifferentRow<DataT>) => Promise<RawInsertValueRow<DataT["table"]>>): Promise<{
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
    } & RawExprUtil.UsedReferences<ReturnType<DefaultValueDelegateT>> & {
        [table in EntityT["alias"]]: {
            [columnName in keyof DataT["entityIdentifier"]]: (EntityT["columns"][columnName]);
        };
    }), (RawExprUtil.Type<ReturnType<ValueDelegateT>> | RawExprUtil.Type<ReturnType<DefaultValueDelegateT>>)>);
    function latestValueExpression<DataT extends LogData, EntityT extends LatestValueExpressionEntityTable<DataT>, ValueDelegateT extends LatestValueExpressionValueDelegate<DataT, EntityT>, DefaultValueDelegateT extends LatestValueExpressionDefaultValueDelegate<DataT, EntityT>>(db: PooledDatabase, data: DataT, entity: EntityT, valueDelegate: ValueDelegateT, defaultValueDelegate: DefaultValueDelegateT): LatestValueExpression<DataT, EntityT, ValueDelegateT, DefaultValueDelegateT>;
    function rowsExistForEntity<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<boolean>;
}
export declare type Trackable<DataT extends LogData> = LogDataUtil.Trackable<DataT>;
//# sourceMappingURL=util.d.ts.map