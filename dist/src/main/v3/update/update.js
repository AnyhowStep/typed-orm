"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateUtil = require("./util");
var UpdateModifier;
(function (UpdateModifier) {
    UpdateModifier["IGNORE"] = "IGNORE";
})(UpdateModifier = exports.UpdateModifier || (exports.UpdateModifier = {}));
class Update {
    constructor(data) {
        this._query = data._query;
        this._assignments = data._assignments;
        this._modifier = data._modifier;
    }
    execute(connection) {
        return UpdateUtil.execute(this, connection);
    }
    printSql() {
        UpdateUtil.printSql(this);
        return this;
    }
}
exports.Update = Update;
//# sourceMappingURL=update.js.map