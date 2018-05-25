"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
class AliasedTable {
    constructor(alias, name, columns) {
        this.alias = alias;
        this.name = name;
        this.columns = columns;
        if (name == alias) {
            this.query = mysql.escapeId(name);
        }
        else {
            this.query = `${mysql.escapeId(name)} AS ${mysql.escapeId(alias)}`;
        }
    }
    querify(sb) {
        sb.append(this.query);
    }
}
exports.AliasedTable = AliasedTable;
//# sourceMappingURL=aliased-table.js.map