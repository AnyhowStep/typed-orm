import {ColumnMap} from "../../column-map";
import {ColumnUtil} from "../../../column";

export type ToInterface<MapT extends ColumnMap> = (
    {
        readonly [columnName in keyof MapT] : (
            ColumnUtil.ToInterface<MapT[columnName]>
        )
    }
);