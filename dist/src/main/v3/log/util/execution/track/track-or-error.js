"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../../../insert");
const track_row_1 = require("../../../../track-row");
const filled_track_row_1 = require("../../../../filled-track-row");
const fetch_latest_or_undefined_1 = require("../fetch-latest-or-undefined");
function trackOrError(log, connection, entityIdentifier, trackRow) {
    return connection.transactionIfNotInOne(async (connection) => {
        const latest = await fetch_latest_or_undefined_1.fetchLatestOrUndefined(log, connection, entityIdentifier);
        if (latest == undefined) {
            trackRow = filled_track_row_1.FilledTrackRowUtil.assertFilledTrackRow(log, trackRow);
            const insertRow = await filled_track_row_1.FilledTrackRowUtil.toInsertLiteralRow(log, entityIdentifier, trackRow, connection);
            return {
                changed: true,
                row: await insert_1.InsertUtil.insertAndFetch(connection, log.table, insertRow),
            };
        }
        const { changed, insertRow } = track_row_1.TrackRowUtil.toInsertRowLiteral(log, trackRow, latest);
        if (changed) {
            return {
                changed: true,
                row: await insert_1.InsertUtil.insertAndFetch(connection, log.table, insertRow),
            };
        }
        else {
            return {
                changed: false,
                row: undefined,
            };
        }
    });
}
exports.trackOrError = trackOrError;
//# sourceMappingURL=track-or-error.js.map