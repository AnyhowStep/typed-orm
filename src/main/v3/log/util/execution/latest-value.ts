import {CompletedLog, EntityIdentifier} from "../../log";
import {QueryUtil} from "../../../query";
import {ColumnUtil} from "../../../column";
import {latestQuery} from "./latest-query";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";

export type LatestValue<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> = (
    QueryUtil.Coalesce<
        QueryUtil.Select<
            QueryUtil.Limit<
                QueryUtil.OrderBy<
                    QueryUtil.WhereEqColumns<
                        QueryUtil.From<
                            QueryUtil.NewInstance,
                            LogT["table"]
                        >
                    >
                >,
                1
            >,
            () => [ReturnType<DelegateT>]
        >,
        LogT["staticDefaultValue"][ReturnType<DelegateT>["name"]]
    >
);
export type LatestValueDelegate<LogT extends CompletedLog> = (
    (
        columns : Pick<
            LogT["table"]["columns"],
            Extract<keyof LogT["staticDefaultValue"], string>
        >
    ) => ColumnUtil.FromColumnMap<Pick<
        LogT["table"]["columns"],
        Extract<keyof LogT["staticDefaultValue"], string>
    >>
);
export function latestValue<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : (
    LatestValue<LogT, DelegateT>
) {
    const columns = ColumnMapUtil.pick(
        log.table.columns,
        Object.keys(log.staticDefaultValue)
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return QueryUtil.coalesce(
        QueryUtil.select(
            latestQuery(log, entityIdentifier),
            (() => [column]) as any
        ),
        log.staticDefaultValue[column.name]
    );
}