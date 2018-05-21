//import {AnySelect} from "./select";
//import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {AnyAliasedExpr, AliasedExprUtil} from "../aliased-expr";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {AnyColumn} from "../column";

export namespace SelectUtil {
    //HACK, Should be `extends AnySelect`
    export type Columns<SelectT extends any> = (
        SelectT extends AnyAliasedExpr ?
        AliasedExprUtil.ToColumn<SelectT> :

        SelectT extends ColumnCollection ?
        ColumnCollectionUtil.Columns<SelectT> :

        SelectT extends AnyColumn ?
        SelectT :
        never
    )
}
