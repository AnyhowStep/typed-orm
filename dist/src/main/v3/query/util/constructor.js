"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
function newInstance() {
    return new query_1.Query({
        joins: undefined,
        parentJoins: undefined,
        unions: undefined,
        selects: undefined,
        limit: undefined,
        unionLimit: undefined,
    }, {
        where: undefined,
    });
}
exports.newInstance = newInstance;
//# sourceMappingURL=constructor.js.map