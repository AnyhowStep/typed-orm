import {IQuery} from "../query";
import {IJoin} from "../join";
import {IAnonymousTypedExpr} from "../expr";
import {MapDelegate} from "../map-delegate";
import {ITable} from "../table";
import { IConnection, DeleteResult } from "../execution";
import * as DeleteUtil from "./util";

export type DeletableQuery = IQuery<{
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
    //TODO-DEBATE Just be strict and not allow it at all?
    readonly _mapDelegate : MapDelegate|undefined;
}>;

export enum DeleteModifier {
    IGNORE = "IGNORE",
}

export interface DeleteData {
    readonly _query : DeletableQuery,
    readonly _tables : (ITable & { deleteAllowed : true })[]|undefined,
    readonly _modifier : DeleteModifier|undefined,
}
export interface IDelete<DataT extends DeleteData=DeleteData> {
    readonly _query : DataT["_query"],
    readonly _tables : DataT["_tables"],
    readonly _modifier : DataT["_modifier"],
}
export class Delete<DataT extends DeleteData> implements IDelete<DataT> {
    readonly _query : DataT["_query"];
    readonly _tables : DataT["_tables"];
    readonly _modifier : DataT["_modifier"];

    constructor (data : DataT) {
        this._query = data._query;
        this._tables = data._tables;
        this._modifier = data._modifier;
    }

    execute (
        this : Extract<this, ExecutableDelete>,
        connection : IConnection
    ) : (
        Promise<DeleteResult>
    ) {
        return DeleteUtil.execute(this, connection);
    }
    printSql (
        this : Extract<this, ExecutableDelete>
    ) : (
        this
    ) {
        DeleteUtil.printSql(this);
        return this;
    }
}
export type ExecutableDelete = IDelete<{
    readonly _query : DeletableQuery,
    readonly _tables : (ITable & { deleteAllowed : true })[],
    readonly _modifier : DeleteModifier|undefined,
}>;