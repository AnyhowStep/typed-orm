import * as mysql from "typed-mysql";
import { CreateSelectBuilderDelegate } from "./select-builder";
import { SelectBuilder } from "./select-builder";
import { Join } from "./join";
import { AnyAliasedTable } from "./aliased-table";
import { SelectDelegate } from "./select-delegate";
import { Table, AnyTable, UniqueKeys, TableRow } from "./table";
import { RawInsertValueRow, InsertValueBuilder } from "./insert-value-builder";
import { InsertSelectBuilderConvenientDelegate } from "./insert-select-builder";
import { UpdateBuilder, RawUpdateAssignmentReferences, UpdateAssignmentReferencesDelegate, UpdateResult } from "./update-builder";
import * as sd from "schema-decorator";
import { WhereDelegate } from "./where-delegate";
import { DeleteBuilder, DeleteTables, DeleteResult } from "./delete-builder";
import { SelectBuilderUtil } from "./select-builder-util";
import { FetchRow } from "./fetch-row";
import { SelectCollectionUtil } from "./select-collection";
import { UniqueKeyCollection } from "./unique-key-collection";
import { PolymorphicRawInsertValueRow } from "./polymorphic-insert-value-and-fetch";
import { PolymorphicUpdateAssignmentCollectionDelegate } from "./polymorphic-update-zero-or-one-by-unique-key";
import { RawExprUtil } from "./raw-expr";
import { LogData, LogDataUtil } from "./log";
import { ColumnCollectionUtil } from "./column-collection";
import { SelectValue } from "./select-value";
import { ColumnReferencesUtil } from "./column-references";
import { TableParentCollectionUtil } from "./table-parent-collection";
import { AnyAliasedExpr } from "./aliased-expr";
import { Column, AnyColumn } from "./column";
import { Expr } from "./expr";
export declare type ConvenientUpdateSelectBuilder<TableT extends AnyTable> = (SelectBuilder<{
    hasSelect: false;
    hasFrom: true;
    hasUnion: false;
    joins: [Join<TableT, TableT["columns"], false>];
    selects: undefined;
    aggregateDelegate: undefined;
    hasParentJoins: false;
    parentJoins: any;
}>);
export declare type ConvenientDeleteSelectBuilder<TableT extends AnyTable> = (SelectBuilder<{
    hasSelect: false;
    hasFrom: true;
    hasUnion: false;
    joins: [Join<TableT, TableT["columns"], false>];
    selects: undefined;
    aggregateDelegate: undefined;
    hasParentJoins: false;
    parentJoins: any;
}>);
export declare class PooledDatabase extends mysql.PooledDatabase {
    allocate(): PooledDatabase;
    acquire<ResultT>(callback: (db: PooledDatabase) => Promise<ResultT>): Promise<ResultT>;
    acquireIfNotTemporary<ResultT>(callback: (db: PooledDatabase) => Promise<ResultT>): Promise<ResultT>;
    transaction<ResultT>(callback: (db: PooledDatabase) => Promise<ResultT>): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(callback: (db: PooledDatabase) => Promise<ResultT>): Promise<ResultT>;
    readonly query: CreateSelectBuilderDelegate;
    from<TableT extends AnyAliasedTable | AnyTable>(table: TableT): (SelectBuilderUtil.FromUnsafe<SelectBuilder<SelectBuilderUtil.CleanData>, TableT>);
    select<SelectDelegateT extends SelectDelegate<ReturnType<CreateSelectBuilderDelegate>>>(delegate: SelectDelegateT): (SelectBuilderUtil.Select<ReturnType<CreateSelectBuilderDelegate>, SelectDelegateT>);
    selectAll<T>(assert: sd.AssertFunc<T>, queryStr: string, queryValues?: mysql.QueryValues): Promise<mysql.SelectResult<T>>;
    selectAll<TableT extends AnyAliasedTable>(table: TableT, where?: WhereDelegate<SelectBuilderUtil.CleanToFrom<TableT>>): SelectBuilderUtil.CleanToSelectAll<TableT>;
    selectAllByUniqueKey<TableT extends AnyTable>(table: TableT, uniqueKey: UniqueKeys<TableT>): (SelectBuilderUtil.CleanToSelectAll<TableT>);
    fetchOneByUniqueKey<TableT extends AnyTable>(table: TableT, uniqueKey: UniqueKeys<TableT>): (Promise<SelectBuilderUtil.AggregatedRow<SelectBuilderUtil.CleanToSelectAll<TableT>>>);
    fetchZeroOrOneByUniqueKey<TableT extends AnyTable>(table: TableT, uniqueKey: UniqueKeys<TableT>): (Promise<undefined | SelectBuilderUtil.AggregatedRow<SelectBuilderUtil.CleanToSelectAll<TableT>>>);
    fetchOneById<TableT extends AnyAliasedTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(table: TableT, id: number): (Promise<FetchRow<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"], SelectCollectionUtil.ToColumnReferences<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]>>>);
    fetchZeroOrOneById<TableT extends AnyAliasedTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(table: TableT, id: number): (Promise<FetchRow<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"], SelectCollectionUtil.ToColumnReferences<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]>> | undefined>);
    fetchValueByUniqueKey<TableT extends AnyTable, DelegateT extends (c: TableT["columns"]) => SelectValue<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>, any> | Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, any>>(table: TableT, uniqueKey: UniqueKeys<TableT>, selectValueDelegate: DelegateT): (Promise<ReturnType<DelegateT> extends AnyAliasedExpr ? ReturnType<ReturnType<DelegateT>["assertDelegate"]> : ReturnType<RawExprUtil.ToExpr<ReturnType<DelegateT>>["assertDelegate"]>>);
    fetchValueOrUndefinedByUniqueKey<TableT extends AnyTable, DelegateT extends (c: TableT["columns"]) => SelectValue<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>, any> | Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, any>>(table: TableT, uniqueKey: UniqueKeys<TableT>, selectValueDelegate: DelegateT): (Promise<undefined | (ReturnType<DelegateT> extends AnyAliasedExpr ? ReturnType<ReturnType<DelegateT>["assertDelegate"]> : ReturnType<RawExprUtil.ToExpr<ReturnType<DelegateT>>["assertDelegate"]>)>);
    insertValue<TableT extends AnyTable>(table: TableT, value: RawInsertValueRow<TableT>): (InsertValueBuilder<TableT, RawInsertValueRow<TableT>[], "NORMAL">);
    insertValueAndFetch<TableT extends AnyTable & {
        data: {
            uniqueKeys: UniqueKeyCollection;
        };
    }>(table: TableT, value: RawInsertValueRow<TableT>): (Promise<FetchRow<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"], SelectCollectionUtil.ToColumnReferences<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]>>>);
    readonly insertSelect: InsertSelectBuilderConvenientDelegate;
    update<T extends mysql.QueryValues, ConditionT extends mysql.QueryValues>(assertRow: sd.AssertFunc<T>, assertCondition: sd.AssertFunc<ConditionT>, table: string, row: T, condition: ConditionT): Promise<mysql.UpdateResult<T, ConditionT>>;
    update<TableT extends AnyTable>(table: TableT, delegate: UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>, where: WhereDelegate<ConvenientUpdateSelectBuilder<TableT>>): (UpdateBuilder<ConvenientUpdateSelectBuilder<TableT>, RawUpdateAssignmentReferences<ConvenientUpdateSelectBuilder<TableT>>>);
    existsById<TableT extends AnyTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(table: TableT, id: number): Promise<boolean>;
    existsByUniqueKey<TableT extends AnyTable & {
        data: {
            uniqueKeys: UniqueKeyCollection;
        };
    }>(table: TableT, uniqueKey: UniqueKeys<TableT>): Promise<boolean>;
    updateZeroOrOneById<TableT extends AnyTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(table: TableT, id: number, delegate: UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>): (Promise<UpdateResult>);
    updateOneById<TableT extends AnyTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(table: TableT, id: number, delegate: UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>): (Promise<UpdateResult>);
    updateAndFetchZeroOrOneById<TableT extends AnyTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(table: TableT, id: number, delegate: UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>): (Promise<UpdateResult & ({
        foundRowCount: 1;
        row: (FetchRow<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"], SelectCollectionUtil.ToColumnReferences<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]>>);
    } | {
        foundRowCount: 0;
        row: undefined;
    })>);
    updateZeroOrOneByUniqueKey<TableT extends AnyTable & {
        data: {
            uniqueKeys: UniqueKeyCollection;
        };
    }>(table: TableT, uniqueKey: UniqueKeys<TableT>, delegate: UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>): (Promise<UpdateResult>);
    updateOneByUniqueKey<TableT extends AnyTable & {
        data: {
            uniqueKeys: UniqueKeyCollection;
        };
    }>(table: TableT, uniqueKey: UniqueKeys<TableT>, delegate: UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>): (Promise<UpdateResult>);
    deleteFrom<TableT extends AnyTable>(table: TableT, where: WhereDelegate<ConvenientDeleteSelectBuilder<TableT>>): (DeleteBuilder<ConvenientDeleteSelectBuilder<TableT>, DeleteTables<ConvenientDeleteSelectBuilder<TableT>>>);
    deleteZeroOrOneByUniqueKey<TableT extends AnyTable & {
        data: {
            uniqueKeys: UniqueKeyCollection;
        };
    }>(table: TableT, uniqueKey: UniqueKeys<TableT>): Promise<DeleteResult>;
    getGenerationExpression(column: AnyColumn): Promise<string>;
    polymorphicInsertValueAndFetch<TableT extends AnyTable>(table: TableT, row: PolymorphicRawInsertValueRow<TableT>): Promise<{ [name in TableT["data"]["parentTables"] extends import("./tuple").Tuple<Table<string, string, import("./column-collection/column-collection").ColumnCollection, any>> ? Extract<keyof TableT["columns"], string> | { [index in Extract<keyof TableT["data"]["parentTables"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: TableT["data"]["parentTables"][index] extends Table<string, string, import("./column-collection/column-collection").ColumnCollection, any> ? Extract<keyof TableT["data"]["parentTables"][index]["columns"], string> : never; }[Extract<keyof TableT["data"]["parentTables"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">] : Extract<keyof TableT["columns"], string>]: name extends keyof TableT["columns"] ? ReturnType<TableT["columns"][name]["assertDelegate"]> : TableT["data"]["parentTables"] extends import("./tuple").Tuple<Table<string, string, import("./column-collection/column-collection").ColumnCollection, any>> ? ("9" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["9"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("8" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["8"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("7" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["7"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("6" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["6"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("5" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["5"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("4" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["4"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("3" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["3"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("2" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["2"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("1" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["1"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? ("0" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["0"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never) extends never ? never : "0" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["0"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "1" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["1"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "2" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["2"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "3" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["3"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "4" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["4"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "5" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["5"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "6" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["6"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "7" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["7"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "8" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["8"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : "9" extends keyof TableT["data"]["parentTables"] ? TableT["data"]["parentTables"]["9"] extends Table<any, any, infer ColumnsT, any> ? name extends keyof ColumnsT ? ReturnType<ColumnsT[name]["assertDelegate"]> : never : never : never : never; }>;
    polymorphicUpdateZeroOrOneByUniqueKey<TableT extends AnyTable>(table: TableT, uniqueKey: UniqueKeys<TableT> & ({} | TableParentCollectionUtil.PartialTableRow<TableT>), setDelegate: PolymorphicUpdateAssignmentCollectionDelegate<TableT>): Promise<mysql.MysqlUpdateResult & {
        foundRowCount: number;
        updatedRowCount: number;
    } & {
        exists: boolean;
    }>;
    fetchLatestOrError<DataT extends LogData>(data: DataT, entityIdentifier: LogDataUtil.EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    fetchLatestOrUndefined<DataT extends LogData>(data: DataT, entityIdentifier: LogDataUtil.EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]> | undefined>;
    fetchLatestOrDefault<DataT extends LogData>(data: DataT, entityIdentifier: LogDataUtil.EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    insertIfDifferentAndFetch<DataT extends LogData>(data: DataT, entityIdentifier: LogDataUtil.EntityIdentifier<DataT>, insertIfDifferentRow: LogDataUtil.InsertIfDifferentRow<DataT>): Promise<{
        latest: TableRow<DataT["table"]>;
        wasInserted: boolean;
    }>;
}
