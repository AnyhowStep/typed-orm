import {ColumnIdentifierUtil} from "./column-identifier";
import {ColumnMap} from "./column-map";
import {IColumn} from "./column";

export namespace ColumnIdentifierArrayUtil {
    export type FromColumnMap<ColumnMapT extends ColumnMap> = (
        ColumnIdentifierUtil.UnionFromColumnMap<ColumnMapT>[]
    );
    export function fromColumnMap<ColumnMapT extends ColumnMap> (
        columnMap : ColumnMapT
    ) : FromColumnMap<ColumnMapT> {
        const columnNames = Object.keys(columnMap) as Extract<keyof ColumnMapT, string>[];
        return columnNames.map((columnName) : ColumnIdentifierUtil.UnionFromColumnMap<ColumnMapT> => {
            const column : Extract<
                ColumnMapT[Extract<keyof ColumnMapT, string>],
                IColumn
            > = (
                columnMap[columnName] as any
            );
            return ColumnIdentifierUtil.fromColumn<
                Extract<
                    ColumnMapT[Extract<keyof ColumnMapT, string>],
                    IColumn
                >
            >(column);
        });
    }
}