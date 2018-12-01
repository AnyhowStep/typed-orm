import  {ColumnIdentifier, ColumnIdentifierUtil} from "./column-identifier";
import  {ColumnMap} from "./column-map";

export interface ColumnIdentifierMap {
    readonly [columnName : string] : ColumnIdentifier
};

export namespace ColumnIdentifierMapUtil {
    export type FromColumnMap<ColumnMapT extends ColumnMap> = (
        {
            readonly [columnName in Extract<keyof ColumnMapT, string>] : (
                ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>
            )
        }
    );
}