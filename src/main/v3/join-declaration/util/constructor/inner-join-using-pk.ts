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
        ToTableT["primaryKey"][number] extends FromTableT["columns"][string]["name"] ?
        (
            (
                ColumnUtil.ToNullable<
                    Extract<
                        ToTableT["columns"][string],
                        { name : ToTableT["primaryKey"][number] }
                    >
                >
            ) extends (
                ColumnUtil.ToNullable<
                    Extract<
                        FromTableT["columns"][string],
                        { name : ToTableT["primaryKey"][number] }
                    >
                >
            ) ?
            unknown :
            [
                FromTableT["alias"],
                "has incompatible columns",
                Exclude<
                    ColumnUtil.ToNullable<
                        Extract<
                            ToTableT["columns"][string],
                            { name : ToTableT["primaryKey"][number] }
                        >
                    >,
                    ColumnUtil.ToNullable<
                        Extract<
                            FromTableT["columns"][string],
                            { name : ToTableT["primaryKey"][number] }
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
                FromTableT["columns"][string]["name"]
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