import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {AssertValidJoinTargetImpl} from "../predicate";
import {JoinType} from "../../../join";
import {JoinDeclaration} from "../../join-declaration";
import {invokeJoinDelegate} from "./join-delegate";

export type AssertValidJoinUsingPkTargetImpl<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    AssertValidJoinTargetImpl<FromTableT, ToTableT> &
    (
        ToTableT["primaryKey"][number] extends ColumnUtil.FromColumnMap<FromTableT["columns"]>["name"] ?
        (
            (
                ColumnUtil.ToInterface<
                    ColumnUtil.WithTableAlias<
                        ColumnUtil.ToNullable<
                            Extract<
                                ColumnUtil.FromColumnMap<ToTableT["columns"]>,
                                { name : ToTableT["primaryKey"][number] }
                            >
                        >,
                        string
                    >
                >
            ) extends (
                ColumnUtil.ToInterface<
                    ColumnUtil.WithTableAlias<
                        ColumnUtil.ToNullable<
                            Extract<
                                ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                                { name : ToTableT["primaryKey"][number] }
                            >
                        >,
                        string
                    >
                >
            ) ?
            unknown :
            [
                FromTableT["alias"],
                "has incompatible columns; expecting",
                Exclude<
                    ColumnUtil.ToInterface<
                        ColumnUtil.WithTableAlias<
                            ColumnUtil.ToNullable<
                                Extract<
                                    ColumnUtil.FromColumnMap<ToTableT["columns"]>,
                                    { name : ToTableT["primaryKey"][number] }
                                >
                            >,
                            string
                        >
                    >,
                    ColumnUtil.ToInterface<
                        ColumnUtil.WithTableAlias<
                            ColumnUtil.ToNullable<
                                Extract<
                                    ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                                    { name : ToTableT["primaryKey"][number] }
                                >
                            >,
                            string
                        >
                    >
                >
            ]
        ) :
        [
            FromTableT["alias"],
            "is missing columns",
            Exclude<
                ToTableT["primaryKey"][number],
                ColumnUtil.FromColumnMap<FromTableT["columns"]>["name"]
            >
        ]
    )
);
export type AssertValidJoinUsingPkTarget<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    ToTableT &
    AssertValidJoinUsingPkTargetImpl<FromTableT, ToTableT>
);

export function invokeJoinUsingPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] },
    NullableT extends boolean
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinUsingPkTarget<FromTableT, ToTableT>,
    nullable : NullableT,
    joinType : JoinType.INNER|JoinType.LEFT
) : (
    JoinDeclaration<{
        readonly fromTable : FromTableT;
        readonly toTable : ToTableT,
        readonly nullable : NullableT,
    }>
) {
    return invokeJoinDelegate(
        fromTable,
        toTable as any,
        () => toTable.primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => toTable.primaryKey.map(
            columnName => toTable.columns[columnName]
        ),
        nullable,
        joinType
    );
}