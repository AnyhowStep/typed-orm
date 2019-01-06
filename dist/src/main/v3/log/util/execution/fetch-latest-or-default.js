"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_latest_or_undefined_1 = require("./fetch-latest-or-undefined");
const fetch_default_1 = require("./fetch-default");
function fetchLatestOrDefault(log, entityIdentifier, connection) {
    return fetch_latest_or_undefined_1.fetchLatestOrUndefined(log, entityIdentifier, connection)
        .then((latest) => {
        if (latest != undefined) {
            return Promise.resolve({
                isDefault: false,
                latest,
                row: latest,
            });
        }
        return fetch_default_1.fetchDefault(log, entityIdentifier, connection)
            .then((def) => {
            return {
                isDefault: true,
                default: def,
                row: def,
            };
        });
    });
}
exports.fetchLatestOrDefault = fetchLatestOrDefault;
//# sourceMappingURL=fetch-latest-or-default.js.map