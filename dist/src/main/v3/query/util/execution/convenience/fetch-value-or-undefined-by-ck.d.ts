import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { RawExprUtil } from "../../../../raw-expr";
import { SelectValueDelegate, AssertValidSelectValueDelegate } from "./select-value-delegate";
import { CandidateKey } from "../../../../candidate-key";
export declare function fetchValueOrUndefinedByCk<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>>(connection: IConnection, table: TableT, ck: CandidateKey<TableT>, delegate: AssertValidSelectValueDelegate<TableT, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>> | undefined>);
//# sourceMappingURL=fetch-value-or-undefined-by-ck.d.ts.map