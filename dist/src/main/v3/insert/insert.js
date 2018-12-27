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
        this._table = data._table;
        this._values = data._values;
        this._modifier = data._modifier;
    }
    ignore() {
        return InsertUtil.ignore(this);
    }
    replace() {
        return InsertUtil.replace(this);
    }
    values(...values) {
        return InsertUtil.values(this, ...values);
    }
    execute(connection) {
        return InsertUtil.execute(this, connection);
    }
}
exports.Insert = Insert;
//# sourceMappingURL=insert.js.map