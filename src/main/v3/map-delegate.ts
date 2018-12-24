export type MapDelegate<RowT=any, OriginalRowT=any, ReturnT=any> = (
    (row : RowT, originalRow : OriginalRowT) => ReturnT
);