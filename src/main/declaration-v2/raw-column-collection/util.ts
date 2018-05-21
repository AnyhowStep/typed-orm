import {RawColumnCollection} from "./raw-column-collection";
import {RawColumnUtil} from "../raw-column";
import {Column} from "../column";

export namespace RawColumnCollectionUtil {
    export type ToColumnCollection<
        TableAliasT extends string,
        RawT extends RawColumnCollection
    > = (
        {
            readonly [columnName in Extract<keyof RawT, string>]: (
                Column<
                    TableAliasT,
                    columnName,
                    RawColumnUtil.TypeOf<RawT[columnName]>
                >
            )
        }
    );
}
