import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {AssertValidJoinTarget} from "../predicate";
import {InnerJoin, innerJoin} from "./inner-join";

export type AssertValidJoinUsingPkTarget<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    AssertValidJoinTarget<FromTableT, ToTableT> &
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
export function innerJoinUsingPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinUsingPkTarget<FromTableT, ToTableT>
) : InnerJoin<FromTableT, ToTableT> {
    return innerJoin(
        fromTable,
        toTable as any,
        () => toTable.primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => toTable.primaryKey.map(
            columnName => toTable.columns[columnName]
        ),
    );
}