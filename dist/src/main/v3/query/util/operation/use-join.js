"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("./join");
function useJoin(query, joinDecl) {
    return join_1.join(query, joinDecl.toTable, () => joinDecl.from, () => joinDecl.to, joinDecl.nullable, joinDecl.joinType);
}
exports.useJoin = useJoin;
//# sourceMappingURL=use-join.js.map