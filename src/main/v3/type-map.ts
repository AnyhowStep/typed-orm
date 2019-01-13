import {ColumnMap} from "./column-map";

export namespace TypeMapUtil {
    export type FromColumnMap<MapT extends ColumnMap> = (
        MapT extends ColumnMap ?
        {
            readonly [columnName in Extract<keyof MapT, string>] : (
                ReturnType<MapT[columnName]["assertDelegate"]>
            )
        } :
        never
    );
}