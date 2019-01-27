import {ITable} from "../../table";
import {ColumnUtil} from "../../../column";
import {ColumnMapUtil} from "../../../column-map";

export type ToInterface<TableT extends ITable> = (
    ITable<{
        readonly usedColumns : ColumnUtil.Array.ToInterface<TableT["usedColumns"]>;
        readonly alias : TableT["alias"];
        readonly columns : ColumnMapUtil.ToInterface<TableT["columns"]>;

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];

        //TODO How should we handle this recursive type?
        //This isn't used internally at the moment.
        //readonly parents : ToInterface<TableT["parents"][number]>[];
        readonly parents : TableT["parents"][number][];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);