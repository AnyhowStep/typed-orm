import {EntityIdentifier, CompletedLog} from "../../log";
import {QueryUtil} from "../../../query";
import {IConnection} from "../../../execution";
import {LatestValueDelegate} from "./latest-value-query";
import {latestValueExpr} from "./latest-value-expr";

export function fetchLatestValueOrDefault<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT,
    connection : IConnection
) : Promise<
    ReturnType<
        LogT["table"]["columns"][
            ReturnType<DelegateT>["name"]
        ]["assertDelegate"]
    >
> {
    return QueryUtil.selectExpr(
        QueryUtil.newInstance(),
        (() => latestValueExpr(log, entityIdentifier, delegate)) as any
    ).fetchValue(connection);
}