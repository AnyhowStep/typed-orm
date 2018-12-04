import {IColumn} from "../column";
import {ColumnIdentifierUtil} from "../../column-identifier";

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
        (
            raw.__subTableName === undefined ||
            typeof raw.__subTableName == "string"
        ) &&
        ("__isInSelectClause" in raw) &&
        (typeof raw.__isInSelectClause == "boolean")
    );
}

export type IsAssignableTo<
    A extends IColumn,
    B extends IColumn
> = (
    boolean extends ColumnIdentifierUtil.IsEqual<A, B> ?
    (
        //No run-time check for this
        ReturnType<A["assertDelegate"]> extends ReturnType<B["assertDelegate"]> ?
        boolean :
        false
    ) :
    ColumnIdentifierUtil.IsEqual<A, B> extends true ?
    (
        //No run-time check for this
        ReturnType<A["assertDelegate"]> extends ReturnType<B["assertDelegate"]> ?
        true :
        false
    ) :
    false
);
