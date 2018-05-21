//import {AnySelect} from "./select";
//import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {AnyAliasedExpr, AliasedExprUtil} from "../aliased-expr";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {AnyColumn} from "../column";
import {AnyJoin, JoinUtil} from "../join";

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

    export type FromJoin<JoinT extends AnyJoin> = (
        true extends JoinT["nullable"] ?
            ColumnCollectionUtil.ToNullable<JoinT["columns"]> :
            JoinT["columns"]
    );
    export function fromJoin<JoinT extends AnyJoin> (join : JoinT) : (
        FromJoin<JoinT>
    ) {
        if (join.nullable) {
            return ColumnCollectionUtil.toNullable(join.columns) as any;
        } else {
            return join.columns as any;
        }
    }
}
