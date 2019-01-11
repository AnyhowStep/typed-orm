"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../../../aliased-table");
const candidate_key_1 = require("../../../candidate-key");
const type_1 = require("../../../type");
function isTableArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isTable(item)) {
            return false;
        }
    }
    return true;
}
exports.isTableArray = isTableArray;
function isTable(raw) {
    return (aliased_table_1.AliasedTableUtil.isAliasedTable(raw) &&
        ("autoIncrement" in raw) &&
        ("id" in raw) &&
        ("primaryKey" in raw) &&
        ("candidateKeys" in raw) &&
        ("generated" in raw) &&
        ("isNullable" in raw) &&
        ("hasExplicitDefaultValue" in raw) &&
        ("mutable" in raw) &&
        ("parents" in raw) &&
        ("insertAllowed" in raw) &&
        ("deleteAllowed" in raw) &&
        (raw.autoIncrement === undefined || typeof raw.autoIncrement == "string") &&
        (raw.id === undefined || typeof raw.id == "string") &&
        (raw.primaryKey === undefined || candidate_key_1.CandidateKeyUtil.isCandidateKey(raw.primaryKey)) &&
        (raw.candidateKeys === undefined || candidate_key_1.CandidateKeyUtil.Array.isCandidateKeyArray(raw.candidateKeys)) &&
        (type_1.isStringArray(raw.generated)) &&
        (type_1.isStringArray(raw.isNullable)) &&
        (type_1.isStringArray(raw.hasExplicitDefaultValue)) &&
        (type_1.isStringArray(raw.mutable)) &&
        (isTableArray(raw.parents)) &&
        (typeof raw.insertAllowed == "boolean") &&
        (typeof raw.deleteAllowed == "boolean"));
}
exports.isTable = isTable;
function isDeletableTable(raw) {
    return isTable(raw) && (raw.deleteAllowed === true);
}
exports.isDeletableTable = isDeletableTable;
//# sourceMappingURL=is-table.js.map