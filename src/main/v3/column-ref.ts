import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IJoin, JoinUtil} from "./join";
import {IColumn, ColumnUtil} from "./column";
import {IQuery} from "./query";
import {ColumnIdentifierMapUtil} from "./column-identifier-map";
import {ColumnIdentifier} from "./column-identifier";
import {Writable} from "./type";
import {Tuple} from "./tuple";
import {ColumnIdentifierRefUtil, ColumnIdentifierRef} from "./column-identifier-ref";
import {SelectItem} from "./select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "./expr-select-item";
import {UnionToIntersection} from "./type";

export type ColumnRef = {
    readonly [tableAlias : string] : ColumnMap
};
export namespace ColumnRefUtil {
    export type FromJoinArray<JoinsT extends IJoin[]> = (
        {
            readonly [tableAlias in JoinUtil.Array.TableAliases<JoinsT>] : (
                ColumnMapUtil.FromJoin<
                    JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>
                >
            )
        }
    );
    function appendJoin(
        ref : Writable<ColumnRef>,
        join : IJoin
    ) {
        appendColumnMap(ref, ColumnMapUtil.fromJoin(join));
        return ref;
    }
    function appendJoinArray(
        ref : Writable<ColumnRef>,
        arr : IJoin[]
    ) {
        for (let join of arr) {
            appendJoin(ref, join);
        }
        return ref;
    }
    export function fromJoinArray<JoinsT extends IJoin[]> (
        joins : JoinsT
    ) : (
        FromJoinArray<JoinsT>
    ) {
        return appendJoinArray({}, joins) as FromJoinArray<JoinsT>;
    }
    //HasOneTable<ColumnRefT> extends true ?
    //    true :
    //    false
    export type HasOneTable<ColumnRefT extends ColumnRef> = (
        Extract<keyof ColumnRefT, string> extends never ?
        //Has zero tables
        false :
        string extends Extract<keyof ColumnRefT, string> ?
        //May have zero, one, or more table
        boolean :
        (
            {
                [tableAlias in Extract<keyof ColumnRefT, string>] : (
                    Exclude<
                        Extract<keyof ColumnRefT, string>,
                        tableAlias
                    >
                )
            }[Extract<keyof ColumnRefT, string>]
        ) extends never ?
        //Has one table
        true :
        //Has more than one table
        false
    );
    export function hasOneTable<ColumnRefT extends ColumnRef> (
        columnRef : ColumnRefT
    ) : HasOneTable<ColumnRefT> {
        return (Object.keys(columnRef).length == 1) as HasOneTable<ColumnRefT>;
    }
    export type ToConvenient<ColumnRefT extends ColumnRef> = (
        HasOneTable<ColumnRefT> extends true ?
        //Gives us a ColumnMap
        ColumnRefT[Extract<keyof ColumnRefT, string>] :
        //Gives us a ColumnRef
        ColumnRefT
    );
    export function toConvenient<ColumnRefT extends ColumnRef> (
        columnRef : ColumnRefT
    ) : ToConvenient<ColumnRefT> {
        const keys = Object.keys(columnRef) as Extract<keyof ColumnRefT, string>[];
        if (keys.length == 1) {
            const result : ColumnRefT[Extract<keyof ColumnRefT, string>] = columnRef[keys[0]];
            return result as any;
        } else {
            return columnRef as any;
        }
    }

    export type FromColumn<ColumnT extends IColumn> = (
        {
            readonly [tableAlias in ColumnT["tableAlias"]] : (
                ColumnMapUtil.FromColumn<ColumnT>
            )
        }
    );
    function appendColumn (
        ref : Writable<ColumnRef>,
        column : IColumn
    ) {
        let map = ref[column.tableAlias];
        if (map == undefined) {
            map = {};
            ref[column.tableAlias] = map;
        }
        map[column.name] = column;
        return ref;
    }
    export function fromColumn<ColumnT extends IColumn> (
        column : ColumnT
    ) : FromColumn<ColumnT> {
        return appendColumn({}, column) as FromColumn<ColumnT>;
    }
    function appendExprSelectItem (
        ref : Writable<ColumnRef>,
        item : IExprSelectItem
    ) {
        let map = ref[item.tableAlias];
        if (map == undefined) {
            map = {};
            ref[item.tableAlias] = map;
        }
        map[item.alias] = ColumnUtil.fromExprSelectItem(item);
        return ref;
    }
    function appendColumnMap (
        ref : Writable<ColumnRef>,
        columnMap : ColumnMap
    ) {
        for (let columnName in columnMap) {
            appendColumn(ref, columnMap[columnName]);
        }
        return ref;
    }
    function appendColumnRef (
        ref : Writable<ColumnRef>,
        columnRef : ColumnRef
    ) {
        for (let tableAlias in columnRef) {
            appendColumnMap(ref, columnRef[tableAlias]);
        }
        return ref;
    }

    export type FromQueryJoins<
        QueryT extends IQuery
    > = (
        (
            QueryT["_joins"] extends IJoin[] ?
            FromJoinArray<QueryT["_joins"]> :
            {}
        ) &
        (
            QueryT["_parentJoins"] extends IJoin[] ?
            FromJoinArray<QueryT["_parentJoins"]> :
            {}
        )
    );
    function appendQuerySelfJoins (ref : Writable<ColumnRef>, query : IQuery) {
        if (query._joins == undefined) {
            return ref;
        } else {
            return appendJoinArray(ref, query._joins);
        }
    }
    function appendQueryParentJoins (ref : Writable<ColumnRef>, query : IQuery) {
        if (query._parentJoins == undefined) {
            return ref;
        } else {
            return appendJoinArray(ref, query._parentJoins);
        }
    }
    function appendQueryJoins (ref : Writable<ColumnRef>, query : IQuery) {
        appendQuerySelfJoins(ref, query);
        appendQueryParentJoins(ref, query);
    }
    export function fromQueryJoins<
        QueryT extends IQuery
    > (query : QueryT) : FromQueryJoins<QueryT> {
        const result : Writable<ColumnRef> = {};
        appendQueryJoins(result, query);
        return result as FromQueryJoins<QueryT>;
    }
    export type FromSelectItemArray_ColumnElement<ColumnT extends IColumn> = (
        {
            readonly [tableAlias in ColumnT["tableAlias"]] : {
                readonly [columnName in ColumnT["name"]] : (
                    Extract<ColumnT, {
                        tableAlias : tableAlias,
                        name : columnName,
                    }>
                )
            }
        }
    );
    export type FromSelectItemArray_ExprSelectItemElement<ExprSelectItemT extends IExprSelectItem> = (
        {
            readonly [tableAlias in ExprSelectItemT["tableAlias"]] : {
                readonly [columnName in ExprSelectItemT["alias"]] : (
                    ColumnUtil.FromExprSelectItem<Extract<
                        ExprSelectItemT,
                        {
                            tableAlias : tableAlias,
                            alias : columnName,
                        }
                    >>
                )
            }
        }
    );
    export type FromSelectItemArray_ColumnMapElement<ColumnMapT extends ColumnMap> = (
        {
            readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>] : {
                readonly [columnName in ColumnMapUtil.FindWithTableAlias<
                    ColumnMapT,
                    tableAlias
                >["name"]] : (
                    Extract<
                        ColumnMapT,
                        {
                            [k in columnName] : (
                                IColumn &
                                {
                                    tableAlias : tableAlias,
                                    name : columnName
                                }
                            )
                        }
                    >[columnName]
                )
            }
        }
    );
    export type FromSelectItemArray_ColumnRefElement<ColumnRefT extends ColumnRef> = (
        //Unfortunately, {} & ColumnMap extends ColumnRef
        ColumnRefT[keyof ColumnRefT] extends ColumnMap ?
        {
            readonly [tableAlias in ColumnRefUtil.TableAlias<ColumnRefT>] : {
                readonly [columnName in ColumnRefUtil.FindWithTableAlias<
                    ColumnRefT,
                    tableAlias
                >["name"]] : (
                    Extract<
                        ColumnRefT,
                        { [ta in tableAlias] : { [cn in columnName] : IColumn } }
                    >[tableAlias][columnName]
                )
            }
        } :
        {}
    );
    export type FromSelectItemArray<ArrT extends SelectItem[]> = (
        ArrT[number] extends never ?
        {} :
        (
            FromSelectItemArray_ColumnElement<
                Extract<ArrT[number], IColumn>
            > &
            FromSelectItemArray_ExprSelectItemElement<
                Extract<ArrT[number], IExprSelectItem>
            > &
            FromSelectItemArray_ColumnMapElement<
                Extract<ArrT[number], ColumnMap>
            > &
            FromSelectItemArray_ColumnRefElement<
                Extract<ArrT[number], ColumnRef>
            >
        )
    );
    function appendSelectItem (
        ref : Writable<ColumnRef>,
        item : SelectItem
    ) {
        if (ColumnUtil.isColumn(item)) {
            appendColumn(ref, item);
        } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
            appendExprSelectItem(ref, item);
        } else if (ColumnMapUtil.isColumnMap(item)) {
            appendColumnMap(ref, item);
        } else if (ColumnRefUtil.isColumnRef(item)) {
            appendColumnRef(ref, item);
        } else {
            throw new Error(`Unknown select item`);
        }
        return ref;
    }
    function appendSelectItemArray(
        ref : Writable<ColumnRef>,
        arr : SelectItem[]
    ) {
        for (let item of arr) {
            appendSelectItem(ref, item);
        }
        return ref;
    }
    export function fromSelectItemArray<ArrT extends SelectItem[]> (
        arr : ArrT
    ) : FromSelectItemArray<ArrT> {
        const result : Writable<ColumnRef> = {};
        appendSelectItemArray(result, arr);
        return result as FromSelectItemArray<ArrT>;
    }
    export type FromQuerySelects<QueryT extends IQuery> = (
        QueryT["_selects"] extends SelectItem[] ?
        FromSelectItemArray<QueryT["_selects"]> :
        {}
    );
    export function fromQuerySelects<QueryT extends IQuery> (
        query : QueryT
    ) : FromQuerySelects<QueryT> {
        const result : ColumnRef = {};
        if (query._selects != undefined) {
            appendSelectItemArray(result, query._selects);
        }
        return result as FromQuerySelects<QueryT>;
    }
    export type FromQuery<QueryT extends IQuery> = (
        FromQueryJoins<QueryT> &
        FromQuerySelects<QueryT>
    );
    export function fromQuery<QueryT extends IQuery> (
        query : QueryT
    ) : FromQuery<QueryT> {
        const result : ColumnRef = {};
        appendQueryJoins(result, query);
        if (query._selects != undefined) {
            appendSelectItemArray(result, query._selects);
        }
        return result as FromQuery<QueryT>;
    }

    //TODO This belongs to ColumnRefIdentifierUtil
    export function assertIsSubset (a : ColumnIdentifierRef, b : ColumnIdentifierRef) {
        for (let tableAliasA in a) {
            const columnMapA = a[tableAliasA];
            const columnMapB = b[tableAliasA];

            if (columnMapB == undefined) {
                throw new Error(`Table ${tableAliasA} is not allowed`);
            }

            ColumnIdentifierMapUtil.assertIsSubset(columnMapA, columnMapB);
        }
    }
    export type HasColumnIdentifier<
        ColumnRefT extends ColumnRef,
        ColumnIdentifierT extends ColumnIdentifier
    > = (
        ColumnIdentifierRefUtil.HasColumnIdentifier<ColumnRefT, ColumnIdentifierT>
    );
    export function hasColumnIdentifier<
        ColumnRefT extends ColumnRef,
        ColumnIdentifierT extends ColumnIdentifier
    > (columnRef : ColumnRefT, columnIdentifier : ColumnIdentifierT) : (
        HasColumnIdentifier<ColumnRefT, ColumnIdentifierT>
    ) {
        return ColumnIdentifierRefUtil.hasColumnIdentifier(columnRef, columnIdentifier);
    }
    export function assertHasColumnIdentifier (columnRef : ColumnRef, columnIdentifier : ColumnIdentifier) {
        ColumnIdentifierRefUtil.assertHasColumnIdentifier(columnRef, columnIdentifier);
    }
    export function assertHasColumnIdentifiers (columnRef : ColumnRef, columnIdentifiers : ColumnIdentifier[]) {
        ColumnIdentifierRefUtil.assertHasColumnIdentifiers(columnRef, columnIdentifiers);
    }

    export type FromColumnArray<ColumnsT extends IColumn[]> = (
        {
            readonly [tableAlias in ColumnsT[number]["tableAlias"]] : (
                ColumnMapUtil.FromColumnArray<
                    Extract<ColumnsT[number], { tableAlias : tableAlias }>[]
                >
            )
        }
    );
    export function fromColumnArray<ColumnsT extends IColumn[]> (
        columns : ColumnsT
    ) : FromColumnArray<ColumnsT> {
        const result : Writable<ColumnRef> = {};
        for (let column of columns) {
            let columnMap : undefined|Writable<ColumnMap> = result[column.tableAlias];
            if (columnMap == undefined) {
                columnMap = {};
                result[column.tableAlias] = columnMap;
            }
            columnMap[column.name] = column;
        }
        return result as FromColumnArray<ColumnsT>;
    }

    //Take the intersection and the "left" columnRef
    export type LeftIntersect<
        ColumnRefA extends ColumnRef,
        ColumnRefB extends ColumnRef
    > = (
        {
            readonly [tableAlias in Extract<keyof ColumnRefA, string>] : (
                tableAlias extends keyof ColumnRefB ?
                ColumnMapUtil.Intersect<
                    ColumnRefA[tableAlias],
                    ColumnRefB[tableAlias]
                > :
                ColumnRefA[tableAlias]
            )
        }
    );
    export type Intersect<
        ColumnRefA extends ColumnRef,
        ColumnRefB extends ColumnRef
    > = (
        Extract<
            LeftIntersect<ColumnRefA, ColumnRefB> &
            {
                readonly [tableAlias in Exclude<
                    Extract<keyof ColumnRefB, string>,
                    keyof ColumnRefA
                >] : (
                    ColumnRefB[tableAlias]
                )
            },
            ColumnRef
        >
    );
    export function intersect<
        ColumnRefA extends ColumnRef,
        ColumnRefB extends ColumnRef
    > (
        columnRefA : ColumnRefA,
        columnRefB : ColumnRefB
    ) : Intersect<ColumnRefA, ColumnRefB> {
        const result : Writable<ColumnRef> = {};
        for (let tableAlias in columnRefA) {
            if (columnRefB.hasOwnProperty(tableAlias)) {
                result[tableAlias] = ColumnMapUtil.intersect(
                    columnRefA[tableAlias],
                    columnRefB[tableAlias]
                );
            } else {
                result[tableAlias] = columnRefA[tableAlias];
            }
        }
        for (let tableAlias in columnRefB) {
            if (!columnRefA.hasOwnProperty(tableAlias)) {
                result[tableAlias] = columnRefB[tableAlias];
            }
        }
        return result as Intersect<ColumnRefA, ColumnRefB>;
    }
    /*
        s = `ArrT[0]`
        arr = [];
        arr.push(s);
        for (let i=1; i<5; ++i) {
            s = `Intersect<${s}, ArrT[${i}]>`;
            arr.push(s);
        }

        arr2 = [];
        for (let i=0; i<arr.length; ++i) {
            arr2.push(`ArrT["length"] extends ${i+1} ?\n        ${arr[i]} :`);
        }
        arr2.join("\n        ")

        The above crashes tsc, so, use the below

        s = `ArrT[0]`
        arr = [];
        arr.push(s);
        for (let i=1; i<5; ++i) {
            s = `${s} & ArrT[${i}]`;
            arr.push(s);
        }

        arr2 = [];
        for (let i=0; i<arr.length; ++i) {
            arr2.push(`ArrT["length"] extends ${i+1} ?\n        ${arr[i]} :`);
        }
        arr2.join("\n        ")
    */
    export type IntersectTuple<ArrT extends ColumnRef[]> = (
        ArrT[number] extends never ?
        {} :
        Extract<
            UnionToIntersection<
                ArrT[number]
            >,
            ColumnRef
        >
        /*
        ArrT["length"] extends 0 ?
        {} :
        ArrT["length"] extends 1 ?
        ArrT[0] :
        ArrT["length"] extends 2 ?
        ArrT[0] & ArrT[1] :
        ArrT["length"] extends 3 ?
        ArrT[0] & ArrT[1] & ArrT[2] :
        ArrT["length"] extends 4 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] :
        ArrT["length"] extends 5 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] :
        ArrT["length"] extends 6 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] :
        ArrT["length"] extends 7 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] :
        ArrT["length"] extends 8 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] :
        ArrT["length"] extends 9 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] :
        ArrT["length"] extends 10 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] :
        ArrT["length"] extends 11 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] :
        ArrT["length"] extends 12 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] :
        ArrT["length"] extends 13 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] :
        ArrT["length"] extends 14 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] :
        ArrT["length"] extends 15 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] :
        ArrT["length"] extends 16 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] :
        ArrT["length"] extends 17 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] :
        ArrT["length"] extends 18 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] & ArrT[17] :
        ArrT["length"] extends 19 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] & ArrT[17] & ArrT[18] :
        ArrT["length"] extends 20 ?
        ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] & ArrT[17] & ArrT[18] & ArrT[19] :
        //add more lengths
        //Too many to handle...
        ColumnRef
        */
    );
    export function intersectTuple<ArrT extends Tuple<ColumnRef>> (
        ...arr : ArrT
    ) : IntersectTuple<ArrT> {
        let result : ColumnRef = {};
        for (let columnRef of arr) {
            result = intersect(result, columnRef);
        }
        return result as IntersectTuple<ArrT>;
    }

    export type ToPartial<RefT extends ColumnRef> = (
        {
            readonly [tableAlias in Extract<keyof RefT, string>]? : {
                readonly [columnName in Extract<keyof RefT[tableAlias], string>]? : (
                    RefT[tableAlias][columnName]
                )
            }
        }
    );

    export function isColumnRef (raw : any) : raw is ColumnRef {
        if (!(raw instanceof Object)) {
            return false;
        }
        if (raw instanceof Array) {
            return false;
        }
        if (raw instanceof Function) {
            return false;
        }
        if (raw instanceof Date) {
            return false;
        }
        for (let tableAlias in raw) {
            const columnMap = raw[tableAlias];
            if (!ColumnMapUtil.isColumnMap(columnMap)) {
                return false;
            }
        }
        return true;
    }

    export type TableAlias<RefT extends ColumnRef> = (
        RefT extends ColumnRef ?
        Extract<keyof RefT, string> :
        never
    );
    export type FindWithTableAlias<RefT extends ColumnRef, TableAliasT extends string> = (
        RefT extends ColumnRef ?
        ColumnMapUtil.FindWithTableAlias<
            RefT[Extract<keyof RefT, string>],
            TableAliasT
        > :
        never
    );

    export type FindWithColumnName<RefT extends ColumnRef, ColumnNameT extends string> = (
        RefT extends ColumnRef ?
        ColumnMapUtil.FindWithColumnName<
            RefT[Extract<keyof RefT, string>],
            ColumnNameT
        > :
        never
    );

    export function getSortedColumnArray (columnRef : ColumnRef) : IColumn[] {
        const tableAliases = Object.keys(columnRef);
        tableAliases.sort();
        const result : IColumn[] = [];
        for (let tableAlias of tableAliases) {
            result.push(...ColumnMapUtil.getSortedColumnArray(columnRef[tableAlias]));
        }
        return result;
    }

    export type DuplicateColumnName<RefT extends ColumnRef> = (
        {
            [tableAlias in Extract<keyof RefT, string>] : (
                Extract<
                    //Get the column names of this ColumnMap
                    ColumnMapUtil.ColumnNames<
                        RefT[tableAlias]
                    >,
                    //Get the column names of all other ColumnMap
                    ColumnMapUtil.ColumnNames<
                        RefT[Exclude<
                            Extract<keyof RefT, string>,
                            tableAlias
                        >]
                    >
                >
            )
        }[Extract<keyof RefT, string>]
    );
    export type HasDuplicateColumnName<RefT extends ColumnRef> = (
        DuplicateColumnName<RefT> extends never ?
        false :
        true
    );

    export type ToInterface<RefT extends ColumnRef> = (
        {
            readonly [tableAlias in keyof RefT] : (
                ColumnMapUtil.ToInterface<RefT[tableAlias]>
            )
        }
    );

    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    export type ColumnNames<RefT extends ColumnRef> = (
        RefT extends ColumnRef ?
        ColumnMapUtil.ColumnNames<
            RefT[Extract<keyof RefT, string>]
        > :
        never
    );
    export function columnNames<RefT extends ColumnRef> (
        columnRef : RefT
    ) : ColumnNames<RefT>[] {
        const result = Object.keys(columnRef).reduce<string[]>(
            (memo, tableAlias) => {
                memo.push(...ColumnMapUtil.columnNames(columnRef[tableAlias]));
                return memo;
            },
            []
        );
        return result as ColumnNames<RefT>[];
    }

}