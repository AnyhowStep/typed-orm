import { TypeWidenDelegate } from "./type-widen-delegate";
import { SelectCollection } from "../select-collection";
import { Column } from "../column";
import * as sd from "schema-decorator";
export declare namespace TypeWidenDelegateUtil {
    function execute<SelectsT extends SelectCollection | undefined, TypeWidenDelegateT extends TypeWidenDelegate<SelectsT>, WidenT>(selects: SelectsT, delegate: TypeWidenDelegateT, assertWidened: sd.AssertFunc<WidenT>): (SelectsT extends SelectCollection ? Column<ReturnType<TypeWidenDelegateT>["tableAlias"], ReturnType<TypeWidenDelegateT>["name"], ReturnType<ReturnType<TypeWidenDelegateT>["assertDelegate"]>> : never);
}
