import * as UpdateUtil from "./util";
import {RawExpr} from "../raw-expr";
import {PrimitiveExpr} from "../primitive-expr";
import {IConnection, UpdateResult} from "../execution";

export enum UpdateModifier {
    IGNORE = "IGNORE",
}

//`tableAlias`.`columnName` = <value>
export interface Assignment {
    readonly tableAlias : string,
    readonly columnName : string,
    readonly value : RawExpr<PrimitiveExpr>
}
export interface UpdateData {
    readonly _query : UpdateUtil.UpdatableQuery,
    readonly _assignments : Assignment[]|undefined,
    readonly _modifier : UpdateModifier|undefined,
}
export interface IUpdate<DataT extends UpdateData=UpdateData> {
    readonly _query : DataT["_query"],
    readonly _assignments : DataT["_assignments"],
    readonly _modifier : DataT["_modifier"],
}
export class Update<DataT extends UpdateData> implements IUpdate<DataT> {
    readonly _query : DataT["_query"];
    readonly _assignments : DataT["_assignments"];
    readonly _modifier : DataT["_modifier"];

    constructor (
        data : DataT
    ) {
        this._query = data._query;
        this._assignments = data._assignments;
        this._modifier = data._modifier;
    }

    execute (
        this : Extract<this, UpdateUtil.ExecutableUpdate>,
        connection : IConnection
    ) : (
        Promise<UpdateResult>
    ) {
        return UpdateUtil.execute(this, connection);
    }
    printSql (
        this : Extract<this, UpdateUtil.ExecutableUpdate>
    ) : this {
        UpdateUtil.printSql(this);
        return this;
    }
}