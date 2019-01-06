import {EntityIdentifier, CompletedLog} from "../../log";
import {QueryUtil} from "../../../query";
import {IConnection} from "../../../execution";
import {LatestValueDelegate} from "./latest-value-query";
import {latestValueQuery} from "./latest-value-query";

export function fetchLatestValueOrUndefined<
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
    >|
    undefined
> {
    return QueryUtil.fetchValueOrUndefined(
        latestValueQuery(log, entityIdentifier, delegate),
        connection
    );
}