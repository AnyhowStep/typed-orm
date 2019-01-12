import {EntityIdentifier, LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {entityIdentifierAssertDelegate} from "../../operation";

export type Latest<LogT extends LogNoTrackedDefaults> = (
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
export function latest<LogT extends LogNoTrackedDefaults> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>
) : (
    Latest<LogT>
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