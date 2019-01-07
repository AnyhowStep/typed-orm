import {ColumnIdentifier} from "../../column-identifier";
import {isObjectWithKeys} from "../../../type";

export function isColumnIdentifier (raw : any) : raw is ColumnIdentifier {
    if (!isObjectWithKeys<ColumnIdentifier>(raw, [
        "tableAlias",
        "name"
    ])) {
        return false;
    }
    return (
        (typeof raw.tableAlias == "string") &&
        (typeof raw.name == "string")
    );
}