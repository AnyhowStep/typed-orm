import {LogNoTrackedDefaults} from "../../../log";
import {QueryUtil} from "../../../../query";
import {JoinDeclarationUtil} from "../../../../join-declaration";

export type LatestOfEntity<LogT extends LogNoTrackedDefaults> = (
    QueryUtil.Limit<
        QueryUtil.OrderBy<
            QueryUtil.Where<
                QueryUtil.From<
                    QueryUtil.RequireParentJoins<
                        QueryUtil.NewInstance,
                        false,
                        [LogT["entity"]]
                    >,
                    LogT["table"]
                >
            >
        >,
        1
    >
);
export function latestOfEntity<LogT extends LogNoTrackedDefaults> (
    log : LogT
) : (
    LatestOfEntity<LogT>
) {
    return QueryUtil.newInstance()
        .requireParentJoins(...([log.entity] as any))
        .from(log.table as any)
        .where(() => JoinDeclarationUtil.eq(log.joinDeclaration))
        .orderBy(() => [log.latestOrder])
        .limit(1) as unknown as LatestOfEntity<LogT>;
}