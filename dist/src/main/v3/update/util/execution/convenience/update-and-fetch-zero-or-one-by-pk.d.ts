import { TableWithPk, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { UpdateAndFetchZeroOrOneResult } from "./update-and-fetch-zero-or-one";
import { PrimaryKey } from "../../../../primary-key";
export declare function updateAndFetchZeroOrOneByPk<TableT extends TableWithPk, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, pk: PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>>);
