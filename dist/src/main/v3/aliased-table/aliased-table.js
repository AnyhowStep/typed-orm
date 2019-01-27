"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AliasedTableUtil = require("./util");
class AliasedTable {
    constructor(data, { unaliasedQuery, }) {
        this.usedColumns = data.usedColumns;
        this.alias = data.alias;
        this.columns = data.columns;
        this.unaliasedQuery = unaliasedQuery;
    }
    queryTree() {
        return AliasedTableUtil.queryTree(this);
    }
}
exports.AliasedTable = AliasedTable;
//# sourceMappingURL=aliased-table.js.map