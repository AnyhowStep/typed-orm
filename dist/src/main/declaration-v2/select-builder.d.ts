/// <reference types="node" />
import { JoinCollection, JoinCollectionUtil } from "./join-collection";
import { JoinFromDelegate, JoinFromDelegateUnsafe } from "./join-from-delegate";
import { JoinToDelegate } from "./join-to-delegate";
import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { Join, JoinType } from "./join";
import { SelectCollection, SelectCollectionUtil } from "./select-collection";
import { SelectDelegate } from "./select-delegate";
import { FetchRow } from "./fetch-row";
import { AggregateDelegate, AggregateDelegatePeekOriginal } from "./aggregate-delegate";
import { TypeNarrowDelegate } from "./type-narrow-delegate";
import { Column } from "./column";
import * as invalid from "./invalid";
import { WhereDelegate, WhereDelegateColumnReferences } from "./where-delegate";
import { GroupByDelegate } from "./group-by-delegate";
import { HavingDelegate } from "./having-delegate";
import { OrderByDelegate } from "./order-by-delegate";
import { TypeWidenDelegate } from "./type-widen-delegate";
import { UnionOrderByDelegate } from "./union-order-by-delegate";
import * as sd from "schema-decorator";
import { FetchValueCheck, FetchValueType } from "./fetch-value";
import { AnyTableAllowInsert } from "./table";
import { AnyGroupBy } from "./group-by";
import { AnyOrderBy } from "./order-by";
import { Expr, AnyExpr } from "./expr";
import { PooledDatabase } from "./PooledDatabase";
import { Querify } from "./querify";
import { StringBuilder } from "./StringBuilder";
import { AliasedExpr } from "./aliased-expr";
import { SubqueryTable } from "./subquery-table";
import { RawExprUtil } from "./raw-expr";
import { UpdateBuilder, UpdateAssignmentReferencesDelegate, RawUpdateAssignmentReferences } from "./update-builder";
import { InsertAssignmentCollectionDelegate, RawInsertSelectAssignmentCollection, InsertSelectBuilder } from "./insert-select-builder";
import { DeleteTables, DeleteBuilder, DeleteTablesDelegate } from "./delete-builder";
import { TupleWConcat, Tuple, TupleKeys, TupleKeysUpTo, TupleLength } from "./tuple";
import { AnyJoin } from "./join";
import { SelectBuilderUtil } from "./select-builder-util";
import { JoinDeclarationUtil, JoinDeclarationUsage } from "./join-declaration";
import { ColumnReferences, ColumnReferencesUtil } from "./column-references";
import { ColumnCollectionUtil } from "./column-collection";
import { Table, AnyTable, UniqueKeys, MinimalUniqueKeys } from "./table";
export declare const ARBITRARY_ROW_COUNT = 999999999;
export interface LimitData {
    readonly rowCount: number;
    readonly offset: number;
}
export interface ExtraSelectBuilderData {
    readonly db: PooledDatabase;
    readonly narrowExpr?: Expr<any, boolean>;
    readonly whereExpr?: Expr<any, boolean>;
    readonly havingExpr?: Expr<any, boolean>;
    readonly union?: {
        target: SelectBuilder<any>;
        distinct: boolean;
    }[];
    readonly distinct: boolean;
    readonly sqlCalcFoundRows: boolean;
    readonly groupBy?: AnyGroupBy[];
    readonly orderBy?: AnyOrderBy[];
    readonly limit?: LimitData;
    readonly unionOrderBy?: AnyOrderBy[];
    readonly unionLimit?: LimitData;
    readonly aggregateDelegates?: (AggregateDelegate<any> | AggregateDelegatePeekOriginal<any, any>)[];
}
export interface RawPaginationArgs {
    page?: number | null | undefined;
    itemsPerPage?: number | null | undefined;
}
export interface PaginateInfo {
    itemsFound: number;
    pagesFound: number;
    page: number;
    itemsPerPage: number;
}
export interface PaginateResult<T> {
    info: PaginateInfo;
    rows: T[];
}
export interface SelectBuilderData {
    readonly hasSelect: boolean;
    readonly hasFrom: boolean;
    readonly hasUnion: boolean;
    readonly joins: JoinCollection;
    readonly selects: undefined | SelectCollection;
    readonly aggregateDelegate: undefined | AggregateDelegate<any> | AggregateDelegatePeekOriginal<any, any>;
    readonly hasParentJoins: boolean;
    readonly parentJoins: JoinCollection;
}
export declare const __DUMMY_FROM_TABLE: Table<"__DUMMY_FROM_TABLE", "__DUMMY_FROM_TABLE", {}, {
    autoIncrement: undefined;
    isGenerated: {};
    hasDefaultValue: {};
    isMutable: {};
    id: undefined;
    uniqueKeys: undefined;
    parentTables: undefined;
    noInsert: false;
}>;
export declare class SelectBuilder<DataT extends SelectBuilderData> implements Querify {
    readonly data: DataT;
    readonly extraData: ExtraSelectBuilderData;
    constructor(data: DataT, extraData: ExtraSelectBuilderData);
    assertAfterFrom(): void;
    assertBeforeSelect(): void;
    assertAfterSelect(): void;
    assertBeforeUnion(): void;
    from<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: false;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT): (SelectBuilderUtil.From<this, ToTableT>);
    join<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<this["data"]["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (SelectBuilderUtil.DoJoin<this, ToTableT>);
    joinUnsafe<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegateUnsafe<this["data"]["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    joinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.InnerJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ? JoinCollectionUtil.InnerJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    joinUsingUnsafe<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: JoinFromDelegateUnsafe<DataT["joins"]>): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    rightJoin<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.RightJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.RightJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    rightJoinUnsafe<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegateUnsafe<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    rightJoinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.RightJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ? JoinCollectionUtil.RightJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    rightJoinUsingUnsafe<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: JoinFromDelegateUnsafe<DataT["joins"]>): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    leftJoin<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.LeftJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.LeftJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    leftJoinUnsafe<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegateUnsafe<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    leftJoinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.LeftJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ? JoinCollectionUtil.LeftJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    leftJoinUsingUnsafe<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: JoinFromDelegateUnsafe<DataT["joins"]>): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    crossJoin<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT): (Error extends JoinCollectionUtil.CrossJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.CrossJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.CrossJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    crossJoinUnsafe<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.CrossJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    select<SelectDelegateT extends SelectDelegate<this>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: any;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, selectDelegate: SelectDelegateT): (SelectBuilderUtil.Select<this, SelectDelegateT>);
    selectUnsafe<SelectDelegateT extends SelectDelegate<this>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: any;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, selectDelegate: SelectDelegateT): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.AppendSelectUnsafe<this["data"]["selects"], this, SelectDelegateT> : key extends "hasSelect" ? true : DataT[key]);
    }>);
    selectAll(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>): (SelectBuilderUtil.SelectAll<this>);
    replaceTable<TableA extends AnyAliasedTable, TableB extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, tableA: TableA, tableB: TableB): (TableB extends AliasedTable<any, any, TableA["columns"]> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB> : DataT[key]);
    }> : Error extends JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> ? JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB> : DataT[key]);
    }>);
    aggregate<AggregateDelegateT extends (AggregateDelegatePeekOriginal<SelectBuilderUtil.AggregatedRow<this>, FetchRow<DataT["joins"], SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>>)>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, aggregateDelegate: AggregateDelegateT): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "aggregateDelegate" ? AggregateDelegateT : DataT[key]);
    }>);
    aggregate<AggregateDelegateT extends (AggregateDelegate<SelectBuilderUtil.AggregatedRow<this>>)>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, aggregateDelegate: AggregateDelegateT): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "aggregateDelegate" ? AggregateDelegateT : DataT[key]);
    }>);
    unsetAggregate(): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "aggregateDelegate" ? undefined : DataT[key]);
    }>);
    private rowAssertDelegate;
    private getRowAssertDelegate;
    static FindStringPaths(obj: any, path?: string[], result?: string[][]): string[][];
    static TryGetDateAtPath(obj: any, path: string[]): Date | undefined;
    readonly processRow: (rawRow: any) => any;
    readonly aggregateRow: (rawRow: any) => Promise<any>;
    fetchAll(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<SelectBuilderUtil.AggregatedRow<this>[]>);
    fetchOne(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<SelectBuilderUtil.AggregatedRow<this>>);
    fetchZeroOrOne(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<undefined | SelectBuilderUtil.AggregatedRow<this>>);
    count(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): Promise<number>;
    exists(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): Promise<boolean>;
    getExistsQuery(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>): string;
    assertExists(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): Promise<void>;
    paginate(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, rawPaginationArgs?: RawPaginationArgs): (Promise<PaginateResult<SelectBuilderUtil.AggregatedRow<this>>>);
    fetchValue(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<this["data"], FetchValueType<this["data"]>>);
    fetchValueOrUndefined(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<this["data"], undefined | FetchValueType<this["data"]>>);
    fetchValueArray(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<this["data"], FetchValueType<this["data"]>[]>);
    cursor(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): AsyncIterableIterator<SelectBuilderUtil.AggregatedRow<this>>;
    private narrow;
    whereIsNotNull<TypeNarrowDelegateT extends TypeNarrowDelegate<this>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT): (SelectBuilderUtil.WhereIsNotNull<this, TypeNarrowDelegateT>);
    whereIsNull<TypeNarrowDelegateT extends TypeNarrowDelegate<this>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT): (SelectBuilderUtil.WhereIsNull<this, TypeNarrowDelegateT>);
    whereIsEqual<TypeNarrowDelegateT extends TypeNarrowDelegate<this>, ConstT extends boolean | number | string>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT, value: ConstT): (SelectBuilderUtil.WhereIsEqual<this, TypeNarrowDelegateT, ConstT>);
    unsetWhere(): this;
    where<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, whereDelegate: WhereDelegateT): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends Extract<ReturnType<WhereDelegateT>, AnyExpr>["usedReferences"] ? this : invalid.E2<"WHERE expression contains some invalid columns; the following are not allowed:", Exclude<ColumnReferencesUtil.Columns<Extract<Extract<ReturnType<WhereDelegateT>, AnyExpr>["usedReferences"], ColumnReferences>>, ColumnReferencesUtil.Columns<WhereDelegateColumnReferences<SelectBuilder<DataT>>>>>);
    andWhere<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, whereDelegate: WhereDelegateT): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends Extract<ReturnType<WhereDelegateT>, AnyExpr>["usedReferences"] ? this : invalid.E4<"WHERE expression", Extract<ReturnType<WhereDelegateT>, AnyExpr>["usedReferences"], "contains some invalid columns; only the following are allowed:", WhereDelegateColumnReferences<SelectBuilder<DataT>>>);
    whereEqualsId<TableT extends AnyTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, table: TableT, id: ReturnType<TableT["data"]["id"]["assertDelegate"]>): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends {
        [tableAlias in TableT["data"]["id"]["tableAlias"]]: {
            [columnName in TableT["data"]["id"]["name"]]: (TableT["data"]["id"]);
        };
    } ? this : invalid.E4<"WHERE expression", {
        [tableAlias in TableT["data"]["id"]["tableAlias"]]: {
            [columnName in TableT["data"]["id"]["name"]]: (TableT["data"]["id"]);
        };
    }, "contains some invalid columns; only the following are allowed:", WhereDelegateColumnReferences<SelectBuilder<DataT>>>);
    whereEqualsIdColumn<TableT extends AnyTable & {
        data: {
            id: Column<any, any, number>;
        };
    }>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, table: TableT, id: {
        [columnName in TableT["data"]["id"]["name"]]: (ReturnType<TableT["data"]["id"]["assertDelegate"]>);
    }): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends {
        [tableAlias in TableT["data"]["id"]["tableAlias"]]: {
            [columnName in TableT["data"]["id"]["name"]]: (TableT["data"]["id"]);
        };
    } ? this : invalid.E4<"WHERE expression", {
        [tableAlias in TableT["data"]["id"]["tableAlias"]]: {
            [columnName in TableT["data"]["id"]["name"]]: (TableT["data"]["id"]);
        };
    }, "contains some invalid columns; only the following are allowed:", WhereDelegateColumnReferences<SelectBuilder<DataT>>>);
    whereEqualsColumns<TableT extends AnyTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, table: TableT, rawCondition: {
        [columnName in keyof TableT["columns"]]?: (ReturnType<TableT["columns"][columnName]["assertDelegate"]>);
    }): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>> ? this : invalid.E4<"WHERE expression", ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, "contains some invalid columns; only the following are allowed:", WhereDelegateColumnReferences<SelectBuilder<DataT>>>);
    whereEqualsUniqueKey<TableT extends AnyTable, ConditionT extends UniqueKeys<TableT>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, table: TableT, rawCondition: ConditionT): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>> ? this : invalid.E4<"WHERE expression", ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, "contains some invalid columns; only the following are allowed:", WhereDelegateColumnReferences<SelectBuilder<DataT>>>);
    whereEqualsMinimalUniqueKey<TableT extends AnyTable, ConditionT extends MinimalUniqueKeys<TableT>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, table: TableT, rawCondition: ConditionT): (WhereDelegateColumnReferences<SelectBuilder<DataT>> extends ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>> ? this : invalid.E4<"WHERE expression", ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, "contains some invalid columns; only the following are allowed:", WhereDelegateColumnReferences<SelectBuilder<DataT>>>);
    distinct(distinct?: boolean): this;
    sqlCalcFoundRows(sqlCalcFoundRows?: boolean): this;
    groupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, groupByDelegate: GroupByDelegateT): this;
    appendGroupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, groupByDelegate: GroupByDelegateT): this;
    unsetGroupBy(): this;
    having<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, havingDelegate: HavingDelegateT): this;
    andHaving<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, havingDelegate: HavingDelegateT): this;
    orderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): this;
    appendOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): this;
    unsetOrderBy(): this;
    limit(rowCount: number): this;
    offset(offset: number): this;
    unsetLimit(): this;
    unionOrderBy<UnionOrderByDelegateT extends UnionOrderByDelegate<SelectBuilder<DataT>>>(unionOrderByDelegate: UnionOrderByDelegateT): this;
    appendUnionOrderBy<UnionOrderByDelegateT extends UnionOrderByDelegate<SelectBuilder<DataT>>>(unionOrderByDelegate: UnionOrderByDelegateT): this;
    unsetUnionOrderBy(): this;
    unionLimit(rowCount: number): this;
    unionOffset(offset: number): this;
    unsetUnionLimit(): this;
    widen<TypeWidenDelegateT extends TypeWidenDelegate<DataT["selects"]>, WidenT>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: undefined;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeWidenDelegate: TypeWidenDelegateT, assertWidened: sd.AssertFunc<WidenT>): (ReturnType<TypeWidenDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, WidenT | TypeT> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, WidenT | TypeT> : DataT[key]);
    }> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeWidenDelegateT>>));
    union<TargetT extends SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, target: TargetT, distinct?: boolean): (TargetT extends SelectBuilder<infer TargetDataT> ? (TargetDataT["selects"] extends SelectCollection ? (DataT["selects"] extends SelectCollection ? (SelectCollectionUtil.HasCompatibleTypes<TargetDataT["selects"], DataT["selects"]> extends true ? (SelectBuilder<DataT>) : invalid.E4<"Target SELECT clause", SelectCollectionUtil.MapToTypes<TargetDataT["selects"]>, "is not compatible with", SelectCollectionUtil.MapToTypes<DataT["selects"]>>) : invalid.E2<"Could not find SELECT clause", DataT["selects"]>) : invalid.E2<"Union target does not have a SELECT clause", TargetDataT["selects"]>) : invalid.E2<"Invalid union target, or could not infer TargetDataT", TargetT>);
    querifyJoins(sb: StringBuilder): void;
    querifyWhere(sb: StringBuilder): void;
    querify(sb: StringBuilder): void;
    getQuery(): string;
    printQuery(): this;
    as<AliasT extends string>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, alias: AliasT): (DataT extends {
        hasSelect: true;
    } ? SubqueryTable<AliasT, DataT> : invalid.E1<"Missing SELECT clause">);
    asExpr<AliasT extends string>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any[] & {
            length: 1;
        } & {
            "0": any;
        };
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, alias: AliasT): (this["data"] extends {
        hasSelect: true;
        selects: any[] & {
            "0": any;
        } & {
            length: 1;
        } & {
            "0": any;
        };
    } ? AliasedExpr<{}, "__expr", AliasT, RawExprUtil.Type<SelectBuilder<this["data"]>>> : never);
    subQuery(): (DataT["hasParentJoins"] extends true ? SelectBuilder<{
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: true;
        parentJoins: (DataT["hasFrom"] extends true ? TupleWConcat<AnyJoin, DataT["parentJoins"], DataT["joins"]> : DataT["parentJoins"]);
    }> : SelectBuilder<{
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: DataT["hasFrom"];
        parentJoins: DataT["joins"];
    }>);
    setParentQuery<ParentT extends SelectBuilder<any>>(parent: ParentT): (true extends ((DataT["hasFrom"] extends true ? ((ParentT["data"]["hasParentJoins"] extends true ? (JoinCollectionUtil.Duplicates<DataT["joins"], ParentT["data"]["parentJoins"]> extends never ? false : true) : false) | (ParentT["data"]["hasFrom"] extends true ? (JoinCollectionUtil.Duplicates<DataT["joins"], ParentT["data"]["joins"]> extends never ? false : true) : false)) : false) | (DataT["hasParentJoins"] extends true ? ((ParentT["data"]["hasParentJoins"] extends true ? (JoinCollectionUtil.Duplicates<DataT["parentJoins"], ParentT["data"]["parentJoins"]> extends never ? false : true) : false) | (ParentT["data"]["hasFrom"] extends true ? (JoinCollectionUtil.Duplicates<DataT["parentJoins"], ParentT["data"]["joins"]> extends never ? false : true) : false)) : false)) ? invalid.E9<"The parent query has some JOINs, or parent scope that are duplicates of this query's JOINs.", "Parent query's JOINs", ParentT["data"]["hasFrom"] extends true ? JoinCollectionUtil.TableAliases<ParentT["data"]["joins"]> : never, "Parent query's parent scope", ParentT["data"]["hasParentJoins"] extends true ? JoinCollectionUtil.TableAliases<ParentT["data"]["parentJoins"]> : never, "This query's JOINs", DataT["hasFrom"] extends true ? JoinCollectionUtil.TableAliases<DataT["joins"]> : never, "This query's parent scope", DataT["hasParentJoins"] extends true ? JoinCollectionUtil.TableAliases<DataT["parentJoins"]> : never> : ParentT["data"]["hasParentJoins"] extends true ? (ParentT["data"]["hasFrom"] extends true ? SelectBuilder<{
        [key in keyof DataT]: (key extends "hasParentJoins" ? true : key extends "parentJoins" ? (TupleWConcat<AnyJoin, ParentT["data"]["parentJoins"], ParentT["data"]["joins"]>) : DataT[key]);
    }> : SelectBuilder<{
        [key in keyof DataT]: (key extends "hasParentJoins" ? true : key extends "parentJoins" ? ParentT["data"]["parentJoins"] : DataT[key]);
    }>) : (ParentT["data"]["hasFrom"] extends true ? SelectBuilder<{
        [key in keyof DataT]: (key extends "hasParentJoins" ? true : key extends "parentJoins" ? ParentT["data"]["joins"] : DataT[key]);
    }> : this));
    insertInto<TableT extends AnyTableAllowInsert>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, table: TableT, delegate: InsertAssignmentCollectionDelegate<TableT, SelectBuilder<DataT>>): (InsertSelectBuilder<TableT, SelectBuilder<DataT>, RawInsertSelectAssignmentCollection<TableT, SelectBuilder<DataT>>, "NORMAL">);
    set(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, delegate: UpdateAssignmentReferencesDelegate<SelectBuilder<DataT>>): (UpdateBuilder<SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: DataT["joins"];
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, RawUpdateAssignmentReferences<SelectBuilder<DataT>>>);
    delete(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, delegate?: DeleteTablesDelegate<SelectBuilder<DataT>>): (DeleteBuilder<SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: DataT["joins"];
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, DeleteTables<SelectBuilder<DataT>>>);
    useJoins<JoinDeclarationArr extends Tuple<JoinDeclarationUsage>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, ...arr: JoinDeclarationArr): (true extends JoinDeclarationUtil.HasDuplicateTableAlias<JoinDeclarationArr> ? invalid.E2<"Duplicate tableAlias found in given join declarations", JoinDeclarationUtil.DuplicateTableAlias<JoinDeclarationArr>> : JoinCollectionUtil.Duplicates<DataT["joins"], {
        [index in TupleKeys<JoinDeclarationArr>]: (Join<JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>, JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>["columns"], false>);
    } & {
        "0": Join<JoinDeclarationUtil.ToTableOf<JoinDeclarationArr["0"]>, JoinDeclarationUtil.ToTableOf<JoinDeclarationArr["0"]>["columns"], false>;
        length: TupleLength<JoinDeclarationArr>;
    } & AnyJoin[]> extends never ? ({
        [index in TupleKeys<JoinDeclarationArr>]: (JoinDeclarationUtil.FromColumnsOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>[number] extends (ColumnReferencesUtil.Columns<JoinCollectionUtil.ToColumnReferences<DataT["joins"]>> | {
            [innerIndex in Extract<TupleKeysUpTo<index>, keyof JoinDeclarationArr>]: (ColumnCollectionUtil.Columns<JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[innerIndex], JoinDeclarationUsage>>["columns"]>);
        }[Extract<TupleKeysUpTo<index>, keyof JoinDeclarationArr>]) ? true : false);
    }[TupleKeys<JoinDeclarationArr>] extends true ? SelectBuilder<{
        readonly hasSelect: DataT["hasSelect"];
        readonly hasFrom: DataT["hasFrom"];
        readonly hasUnion: DataT["hasUnion"];
        readonly joins: TupleWConcat<AnyJoin, DataT["joins"], ({
            [index in TupleKeys<JoinDeclarationArr>]: (Join<JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>, JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>["columns"], JoinDeclarationUtil.JoinTypeOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>> extends JoinType.LEFT ? true : false>);
        } & {
            "0": Join<JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[0], JoinDeclarationUsage>>, JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[0], JoinDeclarationUsage>>["columns"], JoinDeclarationUtil.JoinTypeOf<Extract<JoinDeclarationArr[0], JoinDeclarationUsage>> extends JoinType.LEFT ? true : false>;
        } & {
            length: JoinDeclarationArr["length"];
        } & AnyJoin[])>;
        readonly selects: DataT["selects"];
        readonly aggregateDelegate: DataT["aggregateDelegate"];
        readonly hasParentJoins: DataT["hasParentJoins"];
        readonly parentJoins: DataT["parentJoins"];
    }> : invalid.E1<"Attempting to join from a table/column that does not exist">) : invalid.E2<"Duplicate tableAlias found in given join declarations", JoinCollectionUtil.Duplicates<DataT["joins"], {
        [index in TupleKeys<JoinDeclarationArr>]: (Join<JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>, JoinDeclarationUtil.ToTableOf<Extract<JoinDeclarationArr[index], JoinDeclarationUsage>>["columns"], false>);
    } & {
        "0": Join<JoinDeclarationUtil.ToTableOf<JoinDeclarationArr["0"]>, JoinDeclarationUtil.ToTableOf<JoinDeclarationArr["0"]>["columns"], false>;
        length: TupleLength<JoinDeclarationArr>;
    } & AnyJoin[]>>);
}
export declare type CreateSelectBuilderDelegate = (() => (SelectBuilder<{
    hasSelect: false;
    hasFrom: false;
    hasUnion: false;
    joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
    selects: undefined;
    aggregateDelegate: undefined;
    hasParentJoins: false;
    parentJoins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
}>));
export declare type AnySelectBuilder = SelectBuilder<any>;
//# sourceMappingURL=select-builder.d.ts.map