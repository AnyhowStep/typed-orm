import { ITable } from "../../../../table";
import { UpdateResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable } from "../../constructor";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
export declare type UpdateAndFetchZeroOrOneResult<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>> = (UpdateResult & ({
    foundRowCount: 0;
    updatedRowCount: 0;
    row: undefined;
} | {
    foundRowCount: 1;
    updatedRowCount: 0 | 1;
    row: {
        readonly [columnName in Extract<keyof TableT["columns"], string>]: (columnName extends keyof ReturnType<DelegateT> ? (ReturnType<DelegateT>[columnName] extends RawExpr<ReturnType<TableT["columns"][columnName]["assertDelegate"]>> ? RawExprUtil.TypeOf<ReturnType<DelegateT>[columnName]> : ReturnType<TableT["columns"][columnName]["assertDelegate"]>) : ReturnType<TableT["columns"][columnName]["assertDelegate"]>);
    };
}));
//# sourceMappingURL=update-and-fetch-zero-or-one.d.ts.map