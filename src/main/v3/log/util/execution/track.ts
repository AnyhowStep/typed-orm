import {CompletedLog, EntityIdentifier, LogNoTrackedDefaults} from "../../log";
import {TypeMapUtil} from "../../../type-map";
import {IConnection} from "../../../execution";
import {InsertUtil} from "../../../insert";
import {ITable} from "../../../table";
import {fetchLatestOrDefault} from "./fetch-latest-or-default";
import {TrackRow, TrackRowUtil} from "../../../track-row";

export type TrackResult<LogT extends LogNoTrackedDefaults & { table : ITable & { insertAllowed : true } }> = (
    {
        changed : true,
        row : TypeMapUtil.FromTable<LogT["table"]>,
    } |
    {
        changed : false,
        row : undefined,
    }
);
export function track<LogT extends CompletedLog & { table : ITable & { insertAllowed : true } }> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    trackRow : TrackRow<LogT>,
    connection : IConnection
) : Promise<TrackResult<LogT>> {
    return connection.transactionIfNotInOne(async (connection) : Promise<TrackResult<LogT>> => {
        const {row} = await fetchLatestOrDefault(log, entityIdentifier, connection);
        const {changed, insertRow} = TrackRowUtil.toInsertRowLiteral(
            log,
            trackRow,
            row
        );
        if (changed) {
            return {
                changed : true,
                row : await InsertUtil.insertAndFetch(
                    connection,
                    log.table,
                    insertRow
                ),
            };
        } else {
            return {
                changed : false,
                row : undefined,
            };
        }
    });
}