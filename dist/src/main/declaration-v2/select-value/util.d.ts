import { AnySelectValue } from "./select-value";
import { AnyAliasedExpr } from "../aliased-expr";
import { AnyColumn } from "../column";
export declare namespace SelectValueUtil {
    type Type<SelectValueT extends AnySelectValue> = (SelectValueT extends AnyAliasedExpr ? ReturnType<SelectValueT["assertDelegate"]> : SelectValueT extends AnyColumn ? ReturnType<SelectValueT["assertDelegate"]> : never);
}
//# sourceMappingURL=util.d.ts.map