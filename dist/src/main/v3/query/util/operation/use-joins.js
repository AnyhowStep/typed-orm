"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use_join_1 = require("./use-join");
function useJoins(query, arr) {
    let result = query;
    for (let joinDecl of arr) {
        result = use_join_1.useJoin(result, joinDecl);
    }
    return result;
}
exports.useJoins = useJoins;
//# sourceMappingURL=use-joins.js.map