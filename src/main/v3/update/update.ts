import * as UpdateUtil from "./util";
import {RawExpr} from "../raw-expr";
import {PrimitiveExpr} from "../primitive-expr";
import {IConnection, UpdateResult, UpdateZeroOrOneResult, UpdateOneResult} from "../execution";
import {IQuery} from "../query";
import {IJoin} from "../join";
import {IAnonymousTypedExpr} from "../expr";
import {MapDelegate} from "../map-delegate";

//`Updatable` is used because it's used by MySQL docs.
//`Updateable` doesn't see as much use.
export type UpdatableQuery = IQuery<{
    readonly _distinct : false;
    readonly _sqlCalcFoundRows : false;

    readonly _joins : IJoin[];
    readonly _parentJoins : undefined;
    readonly _selects : undefined;
    readonly _where : IAnonymousTypedExpr<boolean>|undefined;

    readonly _grouped : undefined;
    readonly _having : undefined;

    //Technically allowed for single-table updates
    //but they're too much of a hassle to support...
    //For now?
    //TODO-FEATURE Support ORDER BY, LIMIT for single-table updates
    readonly _orders : undefined;
    readonly _limit : undefined;

    readonly _unions : undefined;
    readonly _unionOrders : undefined;
    readonly _unionLimit : undefined;

    //You can set it but it'll be ignored
    readonly _mapDelegate : MapDelegate|undefined;
}>;

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
    readonly _query : UpdatableQuery,
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
    executeUpdateZeroOrOne (
        this : Extract<this, UpdateUtil.ExecutableUpdate>,
        connection : IConnection
    ) : (
        Promise<UpdateZeroOrOneResult>
    ) {
        return UpdateUtil.executeUpdateZeroOrOne(this, connection);
    }
    executeUpdateOne (
        this : Extract<this, UpdateUtil.ExecutableUpdate>,
        connection : IConnection
    ) : (
        Promise<UpdateOneResult>
    ) {
        return UpdateUtil.executeUpdateOne(this, connection);
    }
    printSql (
        this : Extract<this, UpdateUtil.ExecutableUpdate>
    ) : this {
        UpdateUtil.printSql(this);
        return this;
    }
}