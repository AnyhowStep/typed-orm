import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IJoin} from "./join";
import {JoinArrayUtil} from "./join-array";
import {IColumn, ColumnUtil} from "./column";
import {IQuery} from "./query";
import {ColumnIdentifierMapUtil} from "./column-identifier-map";
import {ColumnIdentifier} from "./column-identifier";
import { Writable } from "./type";

export type ColumnRef = {
    readonly [tableAlias : string] : ColumnMap
};
export namespace ColumnRefUtil {
    export type FromJoinArray<JoinsT extends IJoin[]> = (
        {
            readonly [tableAlias in JoinArrayUtil.ToTableAliasUnion<JoinsT>] : (
                ColumnMapUtil.FromJoin<
                    JoinArrayUtil.FindWithTableAlias<JoinsT, tableAlias>
                >
            )
        }
    );
    export function fromJoinArray<JoinsT extends IJoin[]> (
        joins : JoinsT
    ) : (
        FromJoinArray<JoinsT>
    ) {
        return joins.reduce<{
            [tableAlias in JoinArrayUtil.ToTableAliasUnion<JoinsT>] : (
                ColumnMapUtil.FromJoin<
                    JoinArrayUtil.FindWithTableAlias<JoinsT, tableAlias>
                >
            )
        }>((memo, join) => {
            const tableAlias : JoinArrayUtil.ToTableAliasUnion<JoinsT> = join.aliasedTable.alias;
            const j : JoinArrayUtil.FindWithTableAlias<JoinsT, typeof tableAlias> = join as any;
            const columnMap : ColumnMapUtil.FromJoin<
                JoinArrayUtil.FindWithTableAlias<JoinsT, typeof tableAlias>
            > = ColumnMapUtil.fromJoin(j);

            memo[tableAlias] = columnMap;
            return memo;
        }, {} as any);
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
    export function fromColumn<ColumnT extends IColumn> (
        column : ColumnT
    ) : FromColumn<ColumnT> {
        return {
            [column.tableAlias] : ColumnMapUtil.fromColumn(column)
        } as any;
    }

    export type FromQuery<
        QueryT extends IQuery
    > = (
        (
            QueryT["joins"] extends IJoin[] ?
            FromJoinArray<QueryT["joins"]> :
            {}
        ) &
        (
            QueryT["parentJoins"] extends IJoin[] ?
            FromJoinArray<QueryT["parentJoins"]> :
            {}
        )
    );
    function fromQueryJoins (query : IQuery) {
        if (query.joins == undefined) {
            return {};
        } else {
            return fromJoinArray(query.joins);
        }
    }
    function fromQueryParentJoins (query : IQuery) {
        if (query.parentJoins == undefined) {
            return {};
        } else {
            return fromJoinArray(query.parentJoins);
        }
    }
    export function fromQuery<
        QueryT extends IQuery
    > (query : QueryT) : FromQuery<QueryT> {
        const joinRef = fromQueryJoins(query);
        const parentJoinRef = fromQueryParentJoins(query);
        return Object.assign(
            {},
            joinRef,
            parentJoinRef
        ) as any;
    }

    export function assertIsSubset (a : ColumnRef, b : ColumnRef) {
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
        keyof ColumnRefT extends never ?
        false :
        ColumnRef extends ColumnRefT ?
        boolean :
        string extends ColumnIdentifierT["tableAlias"] ?
        (
            string extends ColumnIdentifierT["name"] ?
            boolean :
            ColumnIdentifierT["name"] extends ColumnUtil.Name.FromColumnRef<ColumnRefT> ?
            boolean :
            false
        ) :
        ColumnIdentifierT["tableAlias"] extends keyof ColumnRefT ?
        (
            ColumnMapUtil.HasColumnIdentifier<
                ColumnRefT[ColumnIdentifierT["tableAlias"]],
                ColumnIdentifierT
            >
        ) :
        false
    );
    export function hasColumnIdentifier<
        ColumnRefT extends ColumnRef,
        ColumnIdentifierT extends ColumnIdentifier
    > (columnRef : ColumnRefT, columnIdentifier : ColumnIdentifierT) : (
        HasColumnIdentifier<ColumnRefT, ColumnIdentifierT>
    ) {
        if (!columnRef.hasOwnProperty(columnIdentifier.tableAlias)) {
            return false as any;
        }
        const columnMap = columnRef[columnIdentifier.tableAlias];
        return ColumnMapUtil.hasColumnIdentifier(columnMap, columnIdentifier) as any;
    }
    export function assertHasColumnIdentifier (columnRef : ColumnRef, columnIdentifier : ColumnIdentifier) {
        if (!hasColumnIdentifier(columnRef, columnIdentifier)) {
            throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column ref`);
        }
    }
    export function assertHasColumnIdentifiers (columnRef : ColumnRef, columnIdentifiers : ColumnIdentifier[]) {
        for (let columnIdentifier of columnIdentifiers) {
            assertHasColumnIdentifier(columnRef, columnIdentifier);
        }
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
}