import { UniqueKey, UniqueKeyUtil } from "../unique-key";
import { UniqueKeyCollection } from "./unique-key-collection";
import { ColumnCollection } from "../column-collection";
import { TupleKeys } from "../tuple";
import * as sd from "schema-decorator";
export declare namespace UniqueKeyCollectionUtil {
    type MinimalWithType<UniqueKeyCollectionT extends UniqueKeyCollection, ColumnCollectionT extends ColumnCollection> = ({
        [index in TupleKeys<UniqueKeyCollectionT>]: (UniqueKeyCollectionT[index] extends UniqueKey ? UniqueKeyUtil.MinimalWithType<UniqueKeyCollectionT[index], ColumnCollectionT> : never);
    }[TupleKeys<UniqueKeyCollectionT>]);
    type WithType<UniqueKeyCollectionT extends UniqueKeyCollection, ColumnCollectionT extends ColumnCollection> = ({
        [index in TupleKeys<UniqueKeyCollectionT>]: (UniqueKeyCollectionT[index] extends UniqueKey ? UniqueKeyUtil.WithType<UniqueKeyCollectionT[index], ColumnCollectionT> : never);
    }[TupleKeys<UniqueKeyCollectionT>]);
    function assertDelegate<UniqueKeyCollectionT extends UniqueKeyCollection, ColumnCollectionT extends ColumnCollection>(tuple: UniqueKeyCollectionT, columns: ColumnCollectionT): (sd.AssertDelegate<WithType<UniqueKeyCollectionT, ColumnCollectionT>>);
    function minimalAssertDelegate<UniqueKeyCollectionT extends UniqueKeyCollection, ColumnCollectionT extends ColumnCollection>(tuple: UniqueKeyCollectionT, columns: ColumnCollectionT): (sd.AssertDelegate<MinimalWithType<UniqueKeyCollectionT, ColumnCollectionT>>);
    type UniqueKeys<UniqueKeyCollectionT extends UniqueKeyCollection> = ({
        [index in TupleKeys<UniqueKeyCollectionT>]: (UniqueKeyCollectionT[index] extends UniqueKey ? UniqueKeyCollectionT[index] : never);
    }[TupleKeys<UniqueKeyCollectionT>]);
    type CommonUniqueKeys<CollectionA extends UniqueKeyCollection, CollectionB extends UniqueKeyCollection> = (Extract<UniqueKeys<CollectionA>, UniqueKeys<CollectionB>>);
    function commonUniqueKeys<CollectionA extends UniqueKeyCollection, CollectionB extends UniqueKeyCollection>(collectionA: CollectionA, collectionB: CollectionB): (CommonUniqueKeys<CollectionA, CollectionB>[]);
}
