import {UniqueKey, UniqueKeyUtil} from "../unique-key";
import {UniqueKeyCollection} from "./unique-key-collection";
import {ColumnCollection} from "../column-collection";
import {TupleKeys} from "../tuple";
import * as sd from "schema-decorator";

export namespace UniqueKeyCollectionUtil {
    export type WithType<
        UniqueKeyCollectionT extends UniqueKeyCollection,
        ColumnCollectionT extends ColumnCollection
    > = (
        {
            [index in TupleKeys<UniqueKeyCollectionT>] : (
                UniqueKeyCollectionT[index] extends UniqueKey ?
                    UniqueKeyUtil.WithType<UniqueKeyCollectionT[index], ColumnCollectionT> :
                    never
            )
        }[TupleKeys<UniqueKeyCollectionT>]
    );
    export function assertDelegate<
        UniqueKeyCollectionT extends UniqueKeyCollection,
        ColumnCollectionT extends ColumnCollection
    > (
        tuple : UniqueKeyCollectionT,
        columns : ColumnCollectionT
    ) : (
        sd.AssertDelegate<WithType<UniqueKeyCollectionT, ColumnCollectionT>>
    ) {
        return sd.or(
            ...tuple.map((uniqueKey) => {
                return UniqueKeyUtil.assertDelegate(uniqueKey, columns)
            })
        ) as any;
    }
}