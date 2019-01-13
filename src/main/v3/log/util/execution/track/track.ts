import {CompletedLog, EntityIdentifier, InsertableLog} from "../../../log";
import {Row} from "../../../../row";
import {IConnection} from "../../../../execution";
import {InsertUtil} from "../../../../insert";
import {TrackRow, TrackRowUtil} from "../../../../track-row";
import {fetchLatestOrDefault} from "../fetch-latest-or-default";

export type TrackResult<LogT extends InsertableLog> = (
    {
        changed : true,
        row : Row<LogT["table"]>,
    } |
    {
        changed : false,
        row : undefined,
    }
);
export function track<LogT extends CompletedLog & InsertableLog> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>,
    trackRow : TrackRow<LogT>
) : Promise<TrackResult<LogT>> {
    return connection.transactionIfNotInOne(async (connection) : Promise<TrackResult<LogT>> => {
        const {row} = await fetchLatestOrDefault(log, connection, entityIdentifier);
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