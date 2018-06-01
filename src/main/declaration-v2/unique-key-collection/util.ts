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
    export type MinimalWithType<
        UniqueKeyCollectionT extends UniqueKeyCollection,
        ColumnCollectionT extends ColumnCollection
    > = (
        {
            [index in TupleKeys<UniqueKeyCollectionT>] : (
                UniqueKeyCollectionT[index] extends UniqueKey ?
                    UniqueKeyUtil.MinimalWithType<UniqueKeyCollectionT[index], ColumnCollectionT> :
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
    export function minimalAssertDelegate<
        UniqueKeyCollectionT extends UniqueKeyCollection,
        ColumnCollectionT extends ColumnCollection
    > (
        tuple : UniqueKeyCollectionT,
        columns : ColumnCollectionT
    ) : (
        sd.AssertDelegate<MinimalWithType<UniqueKeyCollectionT, ColumnCollectionT>>
    ) {
        return sd.or(
            ...tuple.map((uniqueKey) => {
                return UniqueKeyUtil.minimalAssertDelegate(uniqueKey, columns)
            })
        ) as any;
    }

    export type UniqueKeys<
        UniqueKeyCollectionT extends UniqueKeyCollection
    > = (
        {
            [index in TupleKeys<UniqueKeyCollectionT>] : (
                UniqueKeyCollectionT[index] extends UniqueKey ?
                    UniqueKeyCollectionT[index] :
                    never
            )
        }[TupleKeys<UniqueKeyCollectionT>]
    );
    export type CommonUniqueKeys<
        CollectionA extends UniqueKeyCollection,
        CollectionB extends UniqueKeyCollection
    > = (
        Extract<
            UniqueKeys<CollectionA>,
            UniqueKeys<CollectionB>
        >
    );

    export function commonUniqueKeys<
        CollectionA extends UniqueKeyCollection,
        CollectionB extends UniqueKeyCollection
    > (
        collectionA : CollectionA,
        collectionB : CollectionB
    ) : (
        CommonUniqueKeys<
            CollectionA,
            CollectionB
        >[]
    ) {
        const result : UniqueKey[] = [];
        for (let a of collectionA) {
            for (let b of collectionB) {
                if (UniqueKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result as any;
    }
}
