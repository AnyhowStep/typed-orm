import {IColumn} from "../../column";

export function isColumn (raw : any) : raw is IColumn {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("tableAlias" in raw) &&
        ("name" in raw) &&
        ("assertDelegate" in raw) &&
        (typeof raw.tableAlias == "string") &&
        (typeof raw.name == "string") &&
        (typeof raw.assertDelegate == "function") &&
        ("__isInSelectClause" in raw) &&
        (typeof raw.__isInSelectClause == "boolean")
    );
}