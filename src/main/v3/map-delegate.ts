import {IConnection} from "./execution";

export type MapDelegate<RowT=any, OriginalRowT=any, ReturnT=any> = (
    (row : RowT, connection : IConnection, originalRow : OriginalRowT) => ReturnT
);