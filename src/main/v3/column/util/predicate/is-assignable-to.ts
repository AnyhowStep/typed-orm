import {IColumn} from "../../column";
import {ColumnIdentifierUtil} from "../../../column-identifier";

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
