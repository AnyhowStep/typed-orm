import {AnyAliasedTable, AliasedTableUtil} from "../aliased-table";
import {ColumnCollectionUtil} from "../column-collection";
import {Tuple} from "../tuple";
import {JoinToDelegate, JoinToDelegateUtil, JoinTo} from "../join-to-delegate";
import {ColumnTupleUtil} from "../column";
import {JoinType} from "../join";
import {Expr} from "../expr";
import {isNotNullAndEq, and, FALSE} from "../expression";

export type JoinDeclarationFromDelegate<
    FromTableT extends AnyAliasedTable
> = (
    (columns : FromTableT["columns"]) => (
        Tuple<ColumnCollectionUtil.Columns<
            FromTableT["columns"]
        >>
    )
);

export class JoinDeclaration<
    FromTableT extends AnyAliasedTable,
    ToTableT extends AnyAliasedTable,
    JoinFromT extends Tuple<ColumnCollectionUtil.Columns<
        FromTableT["columns"]
    >>,
    JoinToT extends Tuple<ColumnCollectionUtil.Columns<
        ToTableT["columns"]
    >>,
    DefaultJoinTypeT extends JoinType.INNER|JoinType.LEFT
> {
    constructor (
        readonly fromTable : FromTableT,
        readonly toTable : ToTableT,
        readonly fromColumns : JoinFromT,
        readonly toColumns : JoinToT,
        readonly defaultJoinType : DefaultJoinTypeT
    ) {
        AliasedTableUtil.assertHasColumns(fromTable, fromColumns);
        AliasedTableUtil.assertHasColumns(toTable, toColumns);

        if (toColumns.length != fromColumns.length) {
            throw new Error(`Expected JOIN to columns of length ${fromColumns.length}; received ${toColumns.length}`);
        }
    }

    setDefaultJoinType<
        NewDefaultJoinTypeT extends JoinType.INNER|JoinType.LEFT
    > (newDefaultJoinType : NewDefaultJoinTypeT) : (
        JoinDeclaration<
            FromTableT,
            ToTableT,
            JoinFromT,
            JoinToT,
            NewDefaultJoinTypeT
        >
    ) {
        return new JoinDeclaration(
            this.fromTable,
            this.toTable,
            this.fromColumns,
            this.toColumns,
            newDefaultJoinType
        );
    }

    reverse () : (
        JoinDeclaration<
            ToTableT,
            FromTableT,
            JoinToT,
            JoinFromT,
            DefaultJoinTypeT
        >
    ) {
        return new JoinDeclaration(
            this.toTable,
            this.fromTable,
            this.toColumns,
            this.fromColumns,
            this.defaultJoinType
        );
    }

    toEqualityExpression () : Expr<
        (
            ColumnTupleUtil.ToColumnReferences<JoinFromT> &
            ColumnTupleUtil.ToColumnReferences<JoinToT>
        ),
        boolean
    > {
        if (this.fromColumns.length == 0) {
            return FALSE as any;
        }
        const first = isNotNullAndEq(
            this.fromColumns[0],
            this.toColumns[0]
        );
        const others : Expr<any, boolean>[] = [];
        for (let i=1; i<this.fromColumns.length; ++i) {
            others.push(isNotNullAndEq(
                this.fromColumns[i],
                this.toColumns[i]
            ));
        }
        return and(first, ...others);
    }
}

export type AnyJoinDeclaration = JoinDeclaration<
    AnyAliasedTable,
    AnyAliasedTable,
    any,
    any,
    JoinType.INNER|JoinType.LEFT
>;

export type ImplicitJoinDeclarationUsage = AnyJoinDeclaration;
export type InnerOrLeftJoinDeclarationUsage = [JoinType.INNER|JoinType.LEFT, AnyJoinDeclaration];
export type CrossJoinDeclarationUsage = [JoinType.CROSS, AnyAliasedTable];
export type JoinDeclarationUsage = (
    ImplicitJoinDeclarationUsage|
    InnerOrLeftJoinDeclarationUsage|
    CrossJoinDeclarationUsage
);

export function joinFrom<
    FromTableT extends AnyAliasedTable,
    JoinFromD extends JoinDeclarationFromDelegate<FromTableT>
> (
    fromTable : FromTableT,
    fromDelegate : JoinFromD
) : (
    {
        to : <
            ToTableT extends AnyAliasedTable,
            JoinToD extends JoinToDelegate<ToTableT, ReturnType<JoinFromD>>
        >(
            toTable : ToTableT,
            toDelegate : JoinToD
        ) => JoinDeclaration<
            FromTableT,
            ToTableT,
            ReturnType<JoinFromD>,
            Extract<
                ReturnType<JoinToD>,
                JoinTo<ToTableT, ReturnType<JoinFromD>>
            >,
            JoinType.INNER
        >
    }
) {
    const fromColumns = fromDelegate(fromTable.columns);
    AliasedTableUtil.assertHasColumns(fromTable, fromColumns);

    return {
        to : <
            ToTableT extends AnyAliasedTable,
            JoinToD extends JoinToDelegate<ToTableT, ReturnType<JoinFromD>>
        >(
            toTable : ToTableT,
            toDelegate : JoinToD
        ) : (
            JoinDeclaration<
                FromTableT,
                ToTableT,
                ReturnType<JoinFromD>,
                Extract<
                    ReturnType<JoinToD>,
                    JoinTo<ToTableT, ReturnType<JoinFromD>>
                >,
                JoinType.INNER
            >
        ) => {
            const toColumns = JoinToDelegateUtil.execute(
                toTable,
                fromColumns,
                toDelegate
            );
            return new JoinDeclaration(
                fromTable,
                toTable,
                fromColumns,
                toColumns,
                JoinType.INNER
            ) as any;
        }
    };
}

export function joinUsing<
    FromTableT extends AnyAliasedTable,
    ToTableT extends AnyAliasedTable,
    JoinFromD extends JoinDeclarationFromDelegate<FromTableT>
> (
    fromTable : FromTableT,
    toTable : ToTableT,
    fromDelegate : JoinFromD
) : (
    ColumnCollectionUtil.HasColumns<
        //We convert the ToTableT columns to nullable
        //because we want to allow joining `null` with `int`
        //columns
        ColumnCollectionUtil.ToNullable<ToTableT["columns"]>,
        ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>
    > extends true ?
        JoinDeclaration<
            FromTableT,
            ToTableT,
            ReturnType<JoinFromD>,
            ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>,
            JoinType.INNER
        > :
        never
) {
    const fromColumns = fromDelegate(fromTable.columns);
    AliasedTableUtil.assertHasColumns(fromTable, fromColumns);

    const toColumns = JoinToDelegateUtil.createUsing(
        toTable,
        fromColumns
    );
    AliasedTableUtil.assertHasColumns(toTable, toColumns);

    return new JoinDeclaration(
        fromTable,
        toTable,
        fromColumns,
        toColumns,
        JoinType.INNER
    ) as any;
}

export function leftJoinUsing<
    FromTableT extends AnyAliasedTable,
    ToTableT extends AnyAliasedTable,
    JoinFromD extends JoinDeclarationFromDelegate<FromTableT>
> (
    fromTable : FromTableT,
    toTable : ToTableT,
    fromDelegate : JoinFromD
) : (
    ColumnCollectionUtil.HasColumns<
        //We convert the ToTableT columns to nullable
        //because we want to allow joining `null` with `int`
        //columns
        ColumnCollectionUtil.ToNullable<ToTableT["columns"]>,
        ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>
    > extends true ?
        JoinDeclaration<
            FromTableT,
            ToTableT,
            ReturnType<JoinFromD>,
            ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>,
            JoinType.LEFT
        > :
        never
) {
    const fromColumns = fromDelegate(fromTable.columns);
    AliasedTableUtil.assertHasColumns(fromTable, fromColumns);

    const toColumns = JoinToDelegateUtil.createUsing(
        toTable,
        fromColumns
    );
    AliasedTableUtil.assertHasColumns(toTable, toColumns);

    return new JoinDeclaration(
        fromTable,
        toTable,
        fromColumns,
        toColumns,
        JoinType.LEFT
    ) as any;
}
