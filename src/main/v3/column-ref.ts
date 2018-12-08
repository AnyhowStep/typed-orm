import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IJoin} from "./join";
import {JoinArrayUtil} from "./join-array";
import {IColumn, ColumnUtil} from "./column";
import {IQuery} from "./query";
import {ColumnIdentifierMapUtil} from "./column-identifier-map";
import {ColumnIdentifier} from "./column-identifier";
import {Writable} from "./type";
import {NonEmptyTuple} from "./tuple";

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
    function fromQueryJoins (query : IQuery) {
        if (query._joins == undefined) {
            return {};
        } else {
            return fromJoinArray(query._joins);
        }
    }
    function fromQueryParentJoins (query : IQuery) {
        if (query._parentJoins == undefined) {
            return {};
        } else {
            return fromJoinArray(query._parentJoins);
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
    export type IntersectTuple<ArrT extends NonEmptyTuple<ColumnRef>> = (
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
    );
    export function intersectTuple<ArrT extends NonEmptyTuple<ColumnRef>> (
        ...arr : ArrT
    ) : IntersectTuple<ArrT> {
        let result : ColumnRef = {};
        for (let columnRef of arr) {
            result = intersect(result, columnRef);
        }
        return result as IntersectTuple<ArrT>;
    }
}