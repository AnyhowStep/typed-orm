import {ColumnIdentifier, ColumnIdentifierUtil} from "../../column-identifier";
import {ColumnMap} from "../../column-map";

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    {
        readonly [columnName in Extract<keyof ColumnMapT, string>] : (
            ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>
        )
    }
);
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    return Object.keys(columnMap).reduce<{
        [columnName : string] : ColumnIdentifier
    }>(
        (memo, columnName) => {
            memo[columnName] = ColumnIdentifierUtil.fromColumn(columnMap[columnName]);
            return memo;
        },
        {}
    ) as FromColumnMap<ColumnMapT>;
}