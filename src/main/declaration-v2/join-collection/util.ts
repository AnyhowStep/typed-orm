import * as sd from "schema-decorator";
import {JoinCollection} from "./join-collection";
import {TupleKeys, TupleLength, tupleWPush, TupleWPush} from "../tuple";
import {ColumnCollectionUtil} from "../column-collection";
import {JoinType, Join, AnyJoin, JoinUtil} from "../join";
import {AnyColumn, ColumnTupleUtil} from "../column";
import {AnyAliasedTable, AliasedTableUtil} from "../aliased-table";
import {JoinFromDelegate, JoinFromDelegateUtil} from "../join-from-delegate";
import {JoinToDelegate, JoinToDelegateUtil} from "../join-to-delegate";
import * as invalid from "../invalid";

export namespace JoinCollectionUtil {
    //Types only
    export type FindWithTableAlias<JoinsT extends JoinCollection, TableAliasT extends string> = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    (
                        JoinsT[index]["table"]["alias"] extends TableAliasT ?
                            JoinsT[index] :
                            never
                    ) :
                    never
            )
        }[TupleKeys<JoinsT>]
    );
    export type IndexWithTableAlias<JoinsT extends JoinCollection, TableAliasT extends string> = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    (
                        JoinsT[index]["table"]["alias"] extends TableAliasT ?
                            index :
                            never
                    ) :
                    never
            )
        }[TupleKeys<JoinsT>]
    );

    export type Columns<JoinsT extends JoinCollection> = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    (ColumnCollectionUtil.Columns<JoinsT[index]["columns"]>) :
                    never
            )
        }[TupleKeys<JoinsT>]
    );
    export type NullableColumns<JoinsT extends JoinCollection> = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    ColumnCollectionUtil.Columns<
                        ColumnCollectionUtil.ToNullable<
                            JoinsT[index]["columns"]
                        >
                    > :
                    never
            )
        }[TupleKeys<JoinsT>]
    );

    //Types with implementation
    export const push = tupleWPush<AnyJoin>();

    
    export type NullableTableAlias<
        JoinsT extends JoinCollection
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    (
                        true extends JoinsT[index]["nullable"] ?
                            JoinsT[index]["table"]["alias"] :
                            never
                    ) :
                    never
            )
        }[TupleKeys<JoinsT>]
    )
    //Needs to take the `nullable` status of the join into account...
    export type ToColumnReferences<
        JoinsT extends JoinCollection
    > = (
        /*JoinsT[TupleKeys<JoinsT>] extends AnyJoin ?
            (
                {
                    [tableAlias in Extract<NullableTableAlias<JoinsT>, string>] : (
                        ColumnCollectionUtil.ToNullable<FindWithTableAlias<JoinsT, tableAlias>["columns"]>
                    )
                } &
                {
                    [tableAlias in Exclude<
                        JoinsT[TupleKeys<JoinsT>]["table"]["alias"],
                        NullableTableAlias<JoinsT>
                    >] : (
                        FindWithTableAlias<JoinsT, tableAlias>["columns"]
                    )
                }
            ) :
            never*/
        JoinsT[TupleKeys<JoinsT>] extends AnyJoin ?
            {
                readonly [tableAlias in JoinsT[TupleKeys<JoinsT>]["table"]["alias"]] : (
                    true extends FindWithTableAlias<JoinsT, tableAlias>["nullable"] ?
                        ColumnCollectionUtil.ToNullable<FindWithTableAlias<JoinsT, tableAlias>["columns"]> :
                        FindWithTableAlias<JoinsT, tableAlias>["columns"]
                )
            } :
            {}
    );
    export function toColumnReferences<JoinsT extends JoinCollection> (
        joins : JoinsT
    ) : (
        ToColumnReferences<JoinsT>
    ) {
        return joins.reduce((memo, join) => {
            if (join.nullable) {
                memo[join.table.alias] = ColumnCollectionUtil.toNullable(join.columns);
            } else {
                memo[join.table.alias] = join.columns;
            }
            return memo;
        }, {} as any);
    }

    //ColumnReferencesUtil.ToConvenient<> exists,
    //TODO Maybe remove this one?
    export type ToConvenientColumnReferences<
        JoinsT extends JoinCollection
    > = (
        JoinsT["length"] extends 1 ?
            //Only one table
            (
                //Give a column collection
                ToColumnReferences<JoinsT>[
                    keyof ToColumnReferences<JoinsT>
                ]
            ) :
            //Muli-table
            ToColumnReferences<JoinsT>
    );
    export function toConvenientColumnReferences<
        JoinsT extends JoinCollection
    > (joins : JoinsT) : (
        ToConvenientColumnReferences<JoinsT>
    ) {
        if (joins.length == 1) {
            return (toColumnReferences(joins) as any)[
                joins[0].table.alias
            ] as any;
        } else {
            return toColumnReferences(joins) as any;
        }
    }

    export type ToNullable<JoinsT extends JoinCollection> = (
        JoinsT[TupleKeys<JoinsT>] extends AnyJoin ?
            (
                {
                    [index in TupleKeys<JoinsT>] : (
                        JoinsT[index] extends AnyJoin ?
                            JoinUtil.ToNullable<JoinsT[index]> :
                            never
                    )
                } &
                {
                    length : JoinsT["length"],
                    "0" : JoinUtil.ToNullable<JoinsT[0]>
                } &
                AnyJoin[]
            ) :
            never
    );
    export function toNullable<
        JoinsT extends JoinCollection
    > (
        joins : JoinsT
    ) : (
        ToNullable<JoinsT>
    ) {
        return joins.map(JoinUtil.toNullable) as any;
    }

    export function assertNonDuplicateTableAlias (joins : JoinCollection, tableAlias : string) {
        joins.forEach((join, index) => {
            if (join.table.alias == tableAlias) {
                throw new Error(`Alias ${tableAlias} was already used as join ${index}`);
            }
        });
    }
    export function assertHasColumn (joins : JoinCollection, column : AnyColumn) {
        const join = joins.find((join) => {
            if (join.table.alias != column.tableAlias) {
                return false;
            }
            return ColumnCollectionUtil.hasColumn(join.columns, column);
        });
        if (join == null) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in joins`);
        }
    }
    export function assertHasColumns (joins : JoinCollection, arr : AnyColumn[]) {
        for (let i of arr) {
            assertHasColumn(joins, i);
        }
    }

    export type InnerJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinsT,
            Join<
                ToTableT,
                ToTableT["columns"],
                false
            >
        >
    );
    export type RightJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinCollectionUtil.ToNullable<JoinsT>,
            Join<
                ToTableT,
                ToTableT["columns"],
                false
            >
        >
    );
    export type LeftJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinsT,
            Join<
                ToTableT,
                ToTableT["columns"],
                true
            >
        >
    );

    export type CheckedJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        ResultT extends JoinCollection
    > = (
        FindWithTableAlias<JoinsT, ToTableT["alias"]> extends never ?
            ResultT :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join",
                FindWithTableAlias<JoinsT, ToTableT["alias"]>
            >
    );
    function checkedJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        ResultDelegateT extends () => JoinCollection
    > (
        joins : JoinsT,
        toTable : ToTableT,
        resultDelegate : ResultDelegateT
    ) : (
        CheckedJoin<JoinsT, ToTableT, ReturnType<ResultDelegateT>>
    ) {
        assertNonDuplicateTableAlias(joins, toTable.alias);
        //TODO https://github.com/Microsoft/TypeScript/issues/24277
        return resultDelegate() as any;
    }
    export type CheckedJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>,
        ResultT extends JoinCollection,
    > = (
        JoinToDelegateUtil.CreateUsing<ToTableT, ReturnType<FromDelegateT>> extends never ?
            invalid.E4<
                "Table",
                ToTableT["alias"],
                "does not have some columns",
                Exclude<
                    ColumnTupleUtil.WithTableAlias<ReturnType<FromDelegateT>, ToTableT["alias"]>[TupleKeys<ReturnType<FromDelegateT>>],
                    ColumnCollectionUtil.Columns<ToTableT["columns"]>
                >
            > :
            CheckedJoin<JoinsT, ToTableT, ResultT>
    );
    function checkedJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>,
        ResultT extends JoinCollection,
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        resultDelegate : (
            from : ReturnType<FromDelegateT>,
            to : JoinToDelegateUtil.CreateUsingUnsafe<ToTableT, ReturnType<FromDelegateT>>
        ) => ResultT,
    ) : (
        CheckedJoinUsing<JoinsT, ToTableT, FromDelegateT, ResultT>
    ) {
        const from = JoinFromDelegateUtil.execute(joins, fromDelegate);
        const to : JoinToDelegateUtil.CreateUsing<
            ToTableT,
            ReturnType<FromDelegateT>
        > = JoinToDelegateUtil.createUsing(toTable, from);

        return checkedJoin(joins, toTable, () => {
            return resultDelegate(from, to as any);
        }) as any;
    }

    export type InnerJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<JoinsT, ToTableT, InnerJoinUnsafe<JoinsT, ToTableT>>
    );
    export type InnerJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > = (
        CheckedJoinUsing<JoinsT, ToTableT, FromDelegateT, InnerJoinUnsafe<JoinsT, ToTableT>>
    );
    export type RightJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<JoinsT, ToTableT, RightJoinUnsafe<JoinsT, ToTableT>>
    );
    export type RightJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > = (
        CheckedJoinUsing<JoinsT, ToTableT, FromDelegateT, RightJoinUnsafe<JoinsT, ToTableT>>
    );
    export type LeftJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<JoinsT, ToTableT, LeftJoinUnsafe<JoinsT, ToTableT>>
    );
    export type LeftJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > = (
        CheckedJoinUsing<JoinsT, ToTableT, FromDelegateT, LeftJoinUnsafe<JoinsT, ToTableT>>
    );
    export function innerJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        InnerJoin<JoinsT, ToTableT>
    ) {
        return checkedJoin(joins, toTable, () => {
            const from = JoinFromDelegateUtil.execute(joins, fromDelegate);
            const to = JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return push(
                joins,
                new Join(
                    JoinType.INNER,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            );
        });
    }
    export function innerJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        InnerJoinUsing<JoinsT, ToTableT, FromDelegateT>
    ) {
        return checkedJoinUsing(joins, toTable, fromDelegate, (from, to) => {
            return push(
                joins,
                new Join(
                    JoinType.INNER,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            );
        });
    }

    export function rightJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        RightJoin<JoinsT, ToTableT>
    ) {
        return checkedJoin(joins, toTable, () => {
            const from = JoinFromDelegateUtil.execute(joins, fromDelegate);
            const to = JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return push(
                JoinCollectionUtil.toNullable(joins),
                new Join(
                    JoinType.RIGHT,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            );
        });
    }
    export function rightJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        RightJoinUsing<JoinsT, ToTableT, FromDelegateT>
    ) {
        return checkedJoinUsing(joins, toTable, fromDelegate, (from, to) => {
            return push(
                JoinCollectionUtil.toNullable(joins),
                new Join(
                    JoinType.RIGHT,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            );
        });
    }

    export function leftJoin<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        LeftJoin<JoinsT, ToTableT>
    ) {
        return checkedJoin(joins, toTable, () => {
            const from = JoinFromDelegateUtil.execute(joins, fromDelegate);
            const to = JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return push(
                joins,
                new Join(
                    JoinType.LEFT,
                    toTable,
                    toTable.columns,
                    true,
                    from,
                    to
                )
            );
        });
    }
    export function leftJoinUsing<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        LeftJoinUsing<JoinsT, ToTableT, FromDelegateT>
    ) {
        return checkedJoinUsing(joins, toTable, fromDelegate, (from, to) => {
            return push(
                joins,
                new Join(
                    JoinType.LEFT,
                    toTable,
                    toTable.columns,
                    true,
                    from,
                    to
                )
            );
        });
    }

    export type IsReplaceableBy<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        FindWithTableAlias<JoinsT, TableA["alias"]> extends never ?
            //A's alias does not exist
            false :
            (
                true extends AliasedTableUtil.IsReplaceableBy<TableA, TableB> ?
                    (
                        true extends ColumnCollectionUtil.IsReplaceableBy<
                            FindWithTableAlias<JoinsT, TableA["alias"]>["columns"],
                            TableB["columns"]
                        > ?
                            (true) :
                            //The column cannot be replaced
                            (false)
                    ) :
                    //'A' cannot be replaced by 'B'
                    false
            )
    )
    export function isReplaceableBy<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        joins : JoinsT,
        tableA : TableA,
        tableB : TableB
    ) : (IsReplaceableBy<JoinsT, TableA, TableB>) {
        const join = joins.find(join => join.table == tableA);
        if (join == undefined) {
            return false as any;
        }
        if (!AliasedTableUtil.isReplaceableBy(tableA, tableB)) {
            return false as any;
        }
        if (!ColumnCollectionUtil.isReplaceableBy(join.columns, tableB.columns)) {
            return false as any;
        }
        return true as any;
    };

    export type ReplaceJoinUnsafe<
        JoinT extends AnyJoin,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        JoinT["table"] extends TableA ?
            Join<
                AliasedTableUtil.As<TableB, JoinT["table"]["alias"]>,
                ColumnCollectionUtil.AndType<
                    AliasedTableUtil.As<TableB, JoinT["table"]["alias"]>["columns"],
                    JoinT["columns"]
                >,
                JoinT["nullable"]
            > :
            //Not the replacement target
            JoinT
    );
    export type ReplaceTableUnsafe<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    ReplaceJoinUnsafe<
                        JoinsT[index],
                        TableA,
                        TableB
                    > :
                    never
            )
        } &
        {
            "0" : (
                ReplaceJoinUnsafe<
                    JoinsT[0],
                    TableA,
                    TableB
                >
            ),
            length : TupleLength<JoinsT>
        } &
        AnyJoin[]
    );
    export type ReplaceTable<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        true extends IsReplaceableBy<JoinsT, TableA, TableB> ?
            (
                ReplaceTableUnsafe<JoinsT, TableA, TableB>
            ) :
            invalid.E4<
                "Table", TableA,
                "is not replaceable by table", TableB
            >
    );
    export function replaceTable<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        joins : JoinsT,
        tableA : TableA,
        tableB : TableB
    ) : (
        ReplaceTable<JoinsT, TableA, TableB>
    ) {
        assertNonDuplicateTableAlias(joins, tableB.alias);

        if (!AliasedTableUtil.isReplaceableBy(tableA, tableB)) {
            throw new Error(`Cannot replace ${tableA.alias} with ${tableB.alias}`);
        }
        return joins.map((join) => {
            if (join.table == tableA) {
                const aliasedB = AliasedTableUtil.as(tableB, tableA.alias);
                return new Join(
                    join.joinType,
                    aliasedB,
                    ColumnCollectionUtil.andType(
                        aliasedB.columns,
                        join.columns
                    ),
                    join.nullable,
                    //With this, we are potentially comparing
                    //columns of different data types...
                    //TODO Fix? Might be undesirable?
                    join.from,
                    join.to
                );
            } else {
                return join;
            }
        }) as any;
    }

    export type ReplaceColumnType<
        JoinsT extends JoinCollection,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    JoinUtil.ReplaceColumnType<
                        JoinsT[index],
                        TableAliasT,
                        ColumnNameT,
                        NewTypeT
                    > :
                    never
            )
        } &
        {
            "0" : (
                JoinUtil.ReplaceColumnType<
                    JoinsT[0],
                    TableAliasT,
                    ColumnNameT,
                    NewTypeT
                >
            ),
            length : TupleLength<JoinsT>
        } &
        AnyJoin[]
    );
    export function replaceColumnType<
        JoinsT extends JoinCollection,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > (
        joins : JoinsT,
        tableAlias : TableAliasT,
        columnName : ColumnNameT,
        newAssertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        ReplaceColumnType<
            JoinsT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        >
    ) {
        return joins.map((join) => {
            return JoinUtil.replaceColumnType(
                join,
                tableAlias,
                columnName,
                newAssertDelegate
            );
        }) as any;
    };
}