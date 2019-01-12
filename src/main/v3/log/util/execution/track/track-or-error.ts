import {EntityIdentifier, LogNoTrackedDefaults, InsertableLog} from "../../../log";
import {IConnection} from "../../../../execution";
import {InsertUtil} from "../../../../insert";
import {TrackRow, TrackRowUtil} from "../../../../track-row";
import {FilledTrackRowUtil} from "../../../../filled-track-row";
import {fetchLatestOrUndefined} from "../fetch-latest-or-undefined";
import {TrackResult} from "./track";

export function trackOrError<LogT extends LogNoTrackedDefaults & InsertableLog> (
    log : LogT,
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>,
    trackRow : TrackRow<LogT>
) : Promise<TrackResult<LogT>> {
    return connection.transactionIfNotInOne(async (connection) : Promise<TrackResult<LogT>> => {
        const latest = await fetchLatestOrUndefined(log, connection, entityIdentifier);
        if (latest == undefined) {
            trackRow = FilledTrackRowUtil.assertFilledTrackRow(log, trackRow);
            const insertRow = await FilledTrackRowUtil.toInsertLiteralRow(
                log,
                entityIdentifier,
                trackRow,
                connection
            );
            return {
                changed : true,
                row : await InsertUtil.insertAndFetch(
                    connection,
                    log.table,
                    insertRow
                ),
            };
        }

        const {changed, insertRow} = TrackRowUtil.toInsertRowLiteral(
            log,
            trackRow,
            latest as any
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