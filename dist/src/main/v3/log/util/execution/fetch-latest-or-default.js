"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_latest_or_undefined_1 = require("./fetch-latest-or-undefined");
const fetch_default_1 = require("./fetch-default");
function fetchLatestOrDefault(log, connection, entityIdentifier) {
    return fetch_latest_or_undefined_1.fetchLatestOrUndefined(log, connection, entityIdentifier)
        .then((latest) => {
        if (latest != undefined) {
            return Promise.resolve({
                isDefault: false,
                latest,
                row: latest,
            });
        }
        return fetch_default_1.fetchDefault(log, connection, entityIdentifier)
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