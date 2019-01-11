import {AliasedTableUtil} from "../../../aliased-table";
import {ITable, DeletableTable} from "../../table";
import {CandidateKeyUtil} from "../../../candidate-key";
import {isStringArray} from "../../../type";

export function isTableArray (raw : any) : raw is ITable[] {
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
export function isTable (raw : any) : raw is ITable {
    return (
        (AliasedTableUtil.isAliasedTable(raw) as boolean) &&
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
        (raw.primaryKey === undefined || CandidateKeyUtil.isCandidateKey(raw.primaryKey)) &&
        (raw.candidateKeys === undefined || CandidateKeyUtil.Array.isCandidateKeyArray(raw.candidateKeys)) &&

        (isStringArray(raw.generated)) &&
        (isStringArray(raw.isNullable)) &&
        (isStringArray(raw.hasExplicitDefaultValue)) &&
        (isStringArray(raw.mutable)) &&

        (isTableArray(raw.parents)) &&
        (typeof raw.insertAllowed == "boolean") &&
        (typeof raw.deleteAllowed == "boolean")
    );
}
export function isDeletableTable (raw : any) : raw is DeletableTable {
    return isTable(raw) && (raw.deleteAllowed === true)
}