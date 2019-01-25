import * as UpdateUtil from "./util";
import { RawExpr } from "../raw-expr";
import { PrimitiveExpr } from "../primitive-expr";
import { IConnection, UpdateResult, UpdateZeroOrOneResult, UpdateOneResult } from "../execution";
import { IQuery } from "../query";
import { IJoin } from "../join";
import { IAnonymousTypedExpr } from "../expr";
import { MapDelegate } from "../map-delegate";
export declare type UpdatableQuery = IQuery<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: IJoin[];
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
    readonly _where: IAnonymousTypedExpr<boolean> | undefined;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: undefined;
    readonly _limit: undefined;
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: MapDelegate | undefined;
}>;
export declare enum UpdateModifier {
    IGNORE = "IGNORE"
}
export interface Assignment {
    readonly tableAlias: string;
    readonly columnName: string;
    readonly value: RawExpr<PrimitiveExpr>;
}
export interface UpdateData {
    readonly _query: UpdatableQuery;
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
    execute(this: Extract<this, UpdateUtil.ExecutableUpdate>, connection: IConnection): (Promise<UpdateResult>);
    executeUpdateZeroOrOne(this: Extract<this, UpdateUtil.ExecutableUpdate>, connection: IConnection): (Promise<UpdateZeroOrOneResult>);
    executeUpdateOne(this: Extract<this, UpdateUtil.ExecutableUpdate>, connection: IConnection): (Promise<UpdateOneResult>);
    printSql(this: Extract<this, UpdateUtil.ExecutableUpdate>): this;
}
