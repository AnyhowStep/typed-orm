"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.Update = Update;
//# sourceMappingURL=update.js.map