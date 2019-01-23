import {EntityIdentifier, CompletedLog} from "../../log";
import {QueryUtil} from "../../../query";
import {IConnection} from "../../../execution";
import {LatestValueDelegate} from "./latest-value-delegate";
import {fetchLatestValueOrUndefined} from "./fetch-latest-value-or-undefined";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {ColumnMapUtil} from "../../../column-map";

export async function fetchLatestValueOrDefault<
    LogT extends CompletedLog,
    DelegateT extends LatestValueDelegate<LogT>
> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>,
    delegate : DelegateT
) : Promise<
    ReturnType<
        LogT["table"]["columns"][
            ReturnType<DelegateT>["name"]
        ]["assertDelegate"]
    >
> {
    const result = await fetchLatestValueOrUndefined(
        log,
        connection,
        entityIdentifier,
        delegate
    );
    if (result !== undefined) {
        return result;
    }

    //If the entity does not exist, there is no default value
    await QueryUtil.assertExistsByCk(
        connection,
        log.entity,
        entityIdentifier as any
    );

    const columns = ColumnMapUtil.pick(
        log.table.columns,
        log.tracked
    );
    const column = delegate(columns);
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, column);

    return log.trackedDefaults[column.name];
}