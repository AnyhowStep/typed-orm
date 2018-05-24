import {TypeWidenDelegate} from "./type-widen-delegate";
import {SelectCollection, SelectCollectionUtil} from "../select-collection";
import {ColumnReferencesUtil} from "../column-references";
import {Column} from "../column";
import * as sd from "schema-decorator";

export namespace TypeWidenDelegateUtil {
    export function execute<
        SelectsT extends SelectCollection|undefined,
        TypeWidenDelegateT extends TypeWidenDelegate<SelectsT>,
        WidenT
    > (
        selects : SelectsT,
        delegate : TypeWidenDelegateT,
        assertWidened : sd.AssertFunc<WidenT>
    ) : (
        SelectsT extends SelectCollection ?
            Column<
                ReturnType<TypeWidenDelegateT>["tableAlias"],
                ReturnType<TypeWidenDelegateT>["name"],
                ReturnType<ReturnType<TypeWidenDelegateT>["assertDelegate"]>
            > :
            never
    ) {
        if (selects == undefined) {
            throw new Error(`SELECT clause expected`);
        }
        const ref = SelectCollectionUtil.toColumnReferences(selects);
        const column = delegate(
            ColumnReferencesUtil.toConvenient(ref) as any
        );
        ColumnReferencesUtil.assertHasColumn(ref, column);
        return new Column(
            column.tableAlias,
            column.name,
            sd.or(
                column.assertDelegate,
                assertWidened
            )
        ) as any;
    }
}