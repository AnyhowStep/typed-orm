import * as UpdateUtil from "./util";
import { RawExpr } from "../raw-expr";
import { PrimitiveExpr } from "../primitive-expr";
export declare enum UpdateModifier {
    IGNORE = "IGNORE"
}
export interface Assignment {
    readonly tableAlias: string;
    readonly columnName: string;
    readonly value: RawExpr<PrimitiveExpr>;
}
export interface UpdateData {
    readonly _query: UpdateUtil.UpdatableQuery;
    readonly _assignments: Assignment[] | undefined;
    readonly _modifier: UpdateModifier | undefined;
}
export interface IUpdate<DataT extends UpdateData = UpdateData> {
    readonly _query: DataT["_query"];
    readonly _assignments: DataT["_assignments"];
    readonly _modifier: DataT["_modifier"];
}
export declare class Update<DataT extends UpdateData> implements IUpdate<DataT> {
    readonly _query: DataT["_query"];
    readonly _assignments: DataT["_assignments"];
    readonly _modifier: DataT["_modifier"];
    constructor(data: DataT);
}
//# sourceMappingURL=update.d.ts.map