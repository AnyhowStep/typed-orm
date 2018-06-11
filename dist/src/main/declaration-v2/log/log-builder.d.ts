import { AnyTable, TableRow } from "../table";
import { Tuple, TupleKeys, TupleLength } from "../tuple";
import { ColumnCollectionUtil } from "../column-collection";
import { AnyColumn } from "../column";
import { PooledDatabase } from "../PooledDatabase";
import { AnyFieldTuple } from "../field-util";
import * as sd from "schema-decorator";
export interface LogBuilderData {
    readonly table: AnyTable;
    readonly entityIdentifier: {
        readonly [columnName: string]: true;
    };
    readonly isTrackable: {
        readonly [columnName: string]: true;
    };
    readonly doNotCopyOnTrackableChanged: {
        [columnName: string]: true;
    };
    readonly orderByLatest: undefined | Tuple<[string, boolean]>;
    readonly defaultRowDelegate: undefined | AnyDefaultRowDelegate;
}
export declare type DefaultRowDelegate<DataT extends LogBuilderData> = ((entityIdentifier: {
    [columnName in Extract<Extract<keyof DataT["table"]["columns"], keyof DataT["entityIdentifier"]>, string>]: (ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>);
}, db: PooledDatabase) => (TableRow<DataT["table"]> | Promise<TableRow<DataT["table"]>>));
export declare type AnyDefaultRowDelegate = ((entityIdentifier: any, db: PooledDatabase) => any);
export declare type EntityIdentifierColumnCollection<DataT extends LogBuilderData> = (ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["isTrackable"], string> | Extract<keyof DataT["doNotCopyOnTrackableChanged"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>);
export declare function entityIdentifierColumnCollection<DataT extends LogBuilderData>(data: DataT): EntityIdentifierColumnCollection<DataT>;
export declare type EntityIdentifierColumns<DataT extends LogBuilderData> = (ColumnCollectionUtil.Columns<EntityIdentifierColumnCollection<DataT>>);
export declare type EntityIdentifierDelegate<DataT extends LogBuilderData> = ((columns: EntityIdentifierColumnCollection<DataT>) => (Tuple<EntityIdentifierColumns<DataT>>));
export declare type IsTrackableDelegate<DataT extends LogBuilderData> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["entityIdentifier"], string> | Extract<keyof DataT["doNotCopyOnTrackableChanged"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["entityIdentifier"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>>>);
export declare type IsTrackableUnsafeDelegate<DataT extends LogBuilderData> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["entityIdentifier"], string> | Extract<keyof DataT["doNotCopyOnTrackableChanged"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>) => Tuple<AnyColumn>);
export declare type DoNotCopyOnTrackableChangedDelegate<DataT extends LogBuilderData> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["entityIdentifier"], string> | Extract<keyof DataT["isTrackable"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["entityIdentifier"], string> | Extract<keyof DataT["isTrackable"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>>>);
export declare type DoNotCopyOnTrackableChangedUnsafeDelegate<DataT extends LogBuilderData> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<DataT["table"]["columns"], Extract<keyof DataT["entityIdentifier"], string> | Extract<keyof DataT["isTrackable"], string> | Extract<keyof DataT["table"]["data"]["isGenerated"], string>>) => Tuple<AnyColumn>);
export declare type OrderByLatestDelegate<DataT extends LogBuilderData> = ((columns: DataT["table"]["columns"]) => (Tuple<[ColumnCollectionUtil.Columns<DataT["table"]["columns"]>, boolean]>));
export declare type OrderByLatestUnsafeDelegate<DataT extends LogBuilderData> = ((columns: DataT["table"]["columns"]) => (Tuple<[AnyColumn, boolean]>));
export declare class LogBuilder<DataT extends LogBuilderData> {
    readonly data: DataT;
    constructor(data: DataT);
    setEntityIdentifierFields<EntityIdentifierFieldsT extends AnyFieldTuple>(fields: EntityIdentifierFieldsT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "entityIdentifier" ? (EntityIdentifierFieldsT[TupleKeys<EntityIdentifierFieldsT>] extends AnyColumn | sd.Field<any, any> ? {
            readonly [columnName in EntityIdentifierFieldsT[TupleKeys<EntityIdentifierFieldsT>]["name"]]: true;
        } : never) : key extends "defaultRowDelegate" ? undefined : this["data"][key]);
    }>);
    setEntityIdentifier<DelegateT extends EntityIdentifierDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "entityIdentifier" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ? {
            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]]: true;
        } : never) : key extends "defaultRowDelegate" ? undefined : this["data"][key]);
    }>);
    setIsTrackableFields<TrackableFieldsT extends AnyFieldTuple>(fields: TrackableFieldsT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "isTrackable" ? (TrackableFieldsT[TupleKeys<TrackableFieldsT>] extends AnyColumn | sd.Field<any, any> ? {
            readonly [columnName in TrackableFieldsT[TupleKeys<TrackableFieldsT>]["name"]]: true;
        } : never) : this["data"][key]);
    }>);
    setIsTrackableUnsafe<DelegateT extends IsTrackableUnsafeDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "isTrackable" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ? {
            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]]: true;
        } : never) : this["data"][key]);
    }>);
    setIsTrackable<DelegateT extends IsTrackableDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "isTrackable" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ? {
            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]]: true;
        } : never) : this["data"][key]);
    }>);
    setDoNotCopyOnTrackableChangedFields<TrackableFieldsT extends AnyFieldTuple>(fields: TrackableFieldsT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "doNotCopyOnTrackableChanged" ? (TrackableFieldsT[TupleKeys<TrackableFieldsT>] extends AnyColumn | sd.Field<any, any> ? {
            readonly [columnName in TrackableFieldsT[TupleKeys<TrackableFieldsT>]["name"]]: true;
        } : never) : this["data"][key]);
    }>);
    setDoNotCopyOnTrackableChangedUnsafe<DelegateT extends DoNotCopyOnTrackableChangedUnsafeDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "doNotCopyOnTrackableChanged" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ? {
            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]]: true;
        } : never) : this["data"][key]);
    }>);
    setDoNotCopyOnTrackableChanged<DelegateT extends DoNotCopyOnTrackableChangedDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "doNotCopyOnTrackableChanged" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ? {
            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]]: true;
        } : never) : this["data"][key]);
    }>);
    setOrderByLatestUnsafe<DelegateT extends OrderByLatestUnsafeDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "orderByLatest" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends [AnyColumn, boolean] ? ({
            [index in TupleKeys<ReturnType<DelegateT>>]: (ReturnType<DelegateT>[index] extends [AnyColumn, boolean] ? [ReturnType<DelegateT>[index]["0"]["name"], ReturnType<DelegateT>[index]["1"]] : never);
        } & {
            length: TupleLength<ReturnType<DelegateT>>;
        } & {
            "0": [ReturnType<DelegateT>["0"]["0"]["name"], ReturnType<DelegateT>["0"]["1"]];
        } & ([string, boolean])[]) : never) : this["data"][key]);
    }>);
    setOrderByLatest<DelegateT extends OrderByLatestDelegate<this["data"]>>(delegate: DelegateT): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "orderByLatest" ? (ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends [AnyColumn, boolean] ? ({
            [index in TupleKeys<ReturnType<DelegateT>>]: (ReturnType<DelegateT>[index] extends [AnyColumn, boolean] ? [ReturnType<DelegateT>[index]["0"]["name"], ReturnType<DelegateT>[index]["1"]] : never);
        } & {
            length: TupleLength<ReturnType<DelegateT>>;
        } & {
            "0": [ReturnType<DelegateT>["0"]["0"]["name"], ReturnType<DelegateT>["0"]["1"]];
        } & ([string, boolean])[]) : never) : this["data"][key]);
    }>);
    setDefaultRow(delegate: DefaultRowDelegate<this["data"]>): (LogBuilder<{
        readonly [key in keyof this["data"]]: (key extends "defaultRowDelegate" ? (DefaultRowDelegate<this["data"]>) : this["data"][key]);
    }>);
    build(this: (DataT["orderByLatest"] extends Tuple<any> ? (keyof DataT["entityIdentifier"] extends never ? never : (any)) : never)): (DataT);
    buildUnsafe(): (DataT["orderByLatest"] extends Tuple<any> ? (keyof DataT["entityIdentifier"] extends never ? never : (DataT)) : never);
}
export declare function log<TableT extends AnyTable>(table: TableT): LogBuilder<{
    readonly table: TableT;
    readonly entityIdentifier: {};
    readonly isTrackable: {};
    readonly doNotCopyOnTrackableChanged: {};
    readonly orderByLatest: undefined;
    readonly defaultRowDelegate: undefined;
}>;
