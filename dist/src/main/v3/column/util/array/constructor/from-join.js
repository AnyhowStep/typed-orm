"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../../../../column-map");
const from_column_map_1 = require("./from-column-map");
function fromJoin(join) {
    return from_column_map_1.fromColumnMap(column_map_1.ColumnMapUtil.fromJoin(join));
}
exports.fromJoin = fromJoin;
//# sourceMappingURL=from-join.js.map