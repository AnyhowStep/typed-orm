import {AnySelectValue} from "./select-value";
import {AnyAliasedExpr} from "../aliased-expr";
import {AnyColumn} from "../column";

export namespace SelectValueUtil {
    export type Type<SelectValueT extends AnySelectValue> = (
        SelectValueT extends AnyAliasedExpr ?
        ReturnType<SelectValueT["assertDelegate"]> :

        SelectValueT extends AnyColumn ?
        ReturnType<SelectValueT["assertDelegate"]> :

        never
    );
}