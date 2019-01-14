"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InsertUtil = require("./util");
var InsertModifier;
(function (InsertModifier) {
    InsertModifier["IGNORE"] = "IGNORE";
    InsertModifier["REPLACE"] = "REPLACE";
})(InsertModifier = exports.InsertModifier || (exports.InsertModifier = {}));
class Insert {
    constructor(data) {
        if (!data._table.insertAllowed) {
            throw new Error(`Cannot insert into table ${data._table.alias}`);
        }
        this._table = data._table;
        this._values = data._values;
        this._modifier = data._modifier;
    }
    values(...values) {
        return InsertUtil.values(this, ...values);
    }
    execute(connection) {
        return InsertUtil.execute(this, connection);
    }
    executeAndFetch(connection) {
        return InsertUtil.executeAndFetch(this, connection);
    }
    printSql() {
        InsertUtil.printSql(this);
        return this;
    }
}
exports.Insert = Insert;
//# sourceMappingURL=insert.js.map