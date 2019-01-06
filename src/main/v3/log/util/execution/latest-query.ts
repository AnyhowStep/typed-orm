import {EntityIdentifier, LogNoTrackedDefaults} from "../../log";
import {QueryUtil} from "../../../query";
import {entityIdentifierAssertDelegate} from "../operation";

export type LatestQuery<LogT extends LogNoTrackedDefaults> = (
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
    >
);
export function latestQuery<LogT extends LogNoTrackedDefaults> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>
) : (
    LatestQuery<LogT>
) {
    const assertDelegate = entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(
        `${log.table.alias}.entityIdentifier`,
        entityIdentifier
    );
    return QueryUtil.newInstance()
        .from(log.table as any)
        .whereEqColumns(log.table, entityIdentifier)
        .orderBy(() => [log.latestOrder])
        .limit(1);
}