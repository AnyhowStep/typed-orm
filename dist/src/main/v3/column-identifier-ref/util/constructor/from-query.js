"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_join_array_1 = require("./from-join-array");
const from_select_item_array_1 = require("./from-select-item-array");
function fromQuery(query) {
    const result = {};
    if (query._joins != undefined) {
        from_join_array_1.appendJoinArray(result, query._joins);
    }
    if (query._parentJoins != undefined) {
        from_join_array_1.appendJoinArray(result, query._parentJoins);
    }
    if (query._selects != undefined) {
        from_select_item_array_1.appendSelectItemArray(result, query._selects);
    }
    return result;
}
exports.fromQuery = fromQuery;
//# sourceMappingURL=from-query.js.map