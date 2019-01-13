import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchOneResult } from "./update-and-fetch-one";
import { CandidateKey } from "../../../candidate-key";
export declare function updateAndFetchOneByCk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchOneResult<TableT, DelegateT>>>);
//# sourceMappingURL=update-and-fetch-one-by-ck.d.ts.map