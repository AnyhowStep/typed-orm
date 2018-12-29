"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteUtil = require("./util");
var DeleteModifier;
(function (DeleteModifier) {
    DeleteModifier["IGNORE"] = "IGNORE";
})(DeleteModifier = exports.DeleteModifier || (exports.DeleteModifier = {}));
class Delete {
    constructor(data) {
        this._query = data._query;
        this._tables = data._tables;
        this._modifier = data._modifier;
    }
    execute(connection) {
        return DeleteUtil.execute(this, connection);
    }
    printSql() {
        DeleteUtil.printSql(this);
        return this;
    }
}
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map