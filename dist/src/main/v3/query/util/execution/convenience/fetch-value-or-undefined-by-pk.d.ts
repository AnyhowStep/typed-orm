import { TableWithPk } from "../../../../table";
import { IConnection } from "../../../../execution";
import { RawExprUtil } from "../../../../raw-expr";
import { SelectValueDelegate, AssertValidSelectValueDelegate } from "./select-value-delegate";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchValueOrUndefinedByPk<TableT extends TableWithPk, DelegateT extends SelectValueDelegate<TableT>>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>, delegate: AssertValidSelectValueDelegate<TableT, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>> | undefined>);
