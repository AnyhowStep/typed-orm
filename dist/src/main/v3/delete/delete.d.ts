import { IQuery } from "../query";
import { IJoin } from "../join";
import { IAnonymousTypedExpr } from "../expr";
import { MapDelegate } from "../map-delegate";
import { ITable } from "../table";
import { IConnection, RawDeleteResult } from "../execution";
export declare type DeletableQuery = IQuery<{
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
export declare enum DeleteModifier {
    IGNORE = "IGNORE"
}
export interface DeleteData {
    readonly _query: DeletableQuery;
    readonly _tables: (ITable & {
        deleteAllowed: true;
    })[] | undefined;
    readonly _modifier: DeleteModifier | undefined;
}
export interface IDelete<DataT extends DeleteData = DeleteData> {
    readonly _query: DataT["_query"];
    readonly _tables: DataT["_tables"];
    readonly _modifier: DataT["_modifier"];
}
export declare class Delete<DataT extends DeleteData> implements IDelete<DataT> {
    readonly _query: DataT["_query"];
    readonly _tables: DataT["_tables"];
    readonly _modifier: DataT["_modifier"];
    constructor(data: DataT);
    execute(this: Extract<this, ExecutableDelete>, connection: IConnection): (Promise<RawDeleteResult>);
    printSql(this: Extract<this, ExecutableDelete>): (this);
}
export declare type ExecutableDelete = IDelete<{
    readonly _query: DeletableQuery;
    readonly _tables: (ITable & {
        deleteAllowed: true;
    })[];
    readonly _modifier: DeleteModifier | undefined;
}>;
//# sourceMappingURL=delete.d.ts.map