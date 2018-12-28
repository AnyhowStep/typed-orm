"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InsertSelectUtil = require("./util");
var InsertSelectModifier;
(function (InsertSelectModifier) {
    InsertSelectModifier["IGNORE"] = "IGNORE";
    InsertSelectModifier["REPLACE"] = "REPLACE";
})(InsertSelectModifier = exports.InsertSelectModifier || (exports.InsertSelectModifier = {}));
class InsertSelect {
    constructor(data) {
        if (!data._table.insertAllowed) {
            throw new Error(`Cannot insert into table ${data._table.alias}`);
        }
        this._query = data._query;
        this._table = data._table;
        this._row = data._row;
        this._modifier = data._modifier;
    }
    execute(connection) {
        return InsertSelectUtil.execute(this, connection);
    }
}
exports.InsertSelect = InsertSelect;
//# sourceMappingURL=insert-select.js.map