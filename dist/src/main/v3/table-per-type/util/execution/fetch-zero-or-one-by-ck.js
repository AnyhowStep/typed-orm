"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const fetch_zero_or_one_1 = require("./fetch-zero-or-one");
function fetchZeroOrOneByCk(connection, table, ck) {
    return fetch_zero_or_one_1.fetchZeroOrOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck));
}
exports.fetchZeroOrOneByCk = fetchZeroOrOneByCk;
//# sourceMappingURL=fetch-zero-or-one-by-ck.js.map