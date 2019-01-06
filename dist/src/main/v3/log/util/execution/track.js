"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("../../../insert");
const fetch_latest_or_default_1 = require("./fetch-latest-or-default");
const track_row_1 = require("../../../track-row");
function track(log, entityIdentifier, trackRow, connection) {
    return connection.transactionIfNotInOne(async (connection) => {
        const { row } = await fetch_latest_or_default_1.fetchLatestOrDefault(log, entityIdentifier, connection);
        const { changed, insertRow } = track_row_1.TrackRowUtil.toInsertRowLiteral(log, trackRow, row);
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
exports.track = track;
//# sourceMappingURL=track.js.map