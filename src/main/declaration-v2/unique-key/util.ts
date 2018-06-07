import {UniqueKey} from "./unique-key";
import {ColumnCollection} from "../column-collection";
import * as sd from "schema-decorator";

export namespace UniqueKeyUtil {
    //TODO Find better name
    export type MinimalWithType<
        UniqueKeyT extends UniqueKey,
        ColumnCollectionT extends ColumnCollection
    > = (
        {
            [columnName in Extract<
                Extract<keyof ColumnCollectionT, string>,
                keyof UniqueKeyT
            >] : (
                ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>
            )
        }
    );
    export type WithType<
        UniqueKeyT extends UniqueKey,
        ColumnCollectionT extends ColumnCollection
    > = (
        MinimalWithType<UniqueKeyT, ColumnCollectionT> &
        /*{
            [columnName in Extract<
                Extract<keyof ColumnCollectionT, string>,
                keyof UniqueKeyT
            >] : (
                ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>
            )
        } &*/
        {
            [columnName in Exclude<
                Extract<keyof ColumnCollectionT, string>,
                keyof UniqueKeyT
            >]? : (
                ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>
            )
        }
    );
    export function assertDelegate<
        UniqueKeyT extends UniqueKey,
        ColumnCollectionT extends ColumnCollection
    > (
        uniqueKey : UniqueKey,
        columns : ColumnCollectionT
    ) : (
        sd.AssertDelegate<WithType<UniqueKeyT, ColumnCollectionT>>
    ) {
        const fields : sd.Field<any, any>[] = [];
        for (let columnName in columns) {
            const column = columns[columnName];
            if (uniqueKey[columnName] === true) {
                fields.push(sd.field(column.name, column.assertDelegate));
            } else {
                fields.push(sd.field(column.name, sd.optional(column.assertDelegate)));
            }
        }
        return sd.schema(...fields) as any;
    }
    export function minimalAssertDelegate<
        UniqueKeyT extends UniqueKey,
        ColumnCollectionT extends ColumnCollection
    > (
        uniqueKey : UniqueKey,
        columns : ColumnCollectionT
    ) : (
        sd.AssertDelegate<MinimalWithType<UniqueKeyT, ColumnCollectionT>>
    ) {
        const fields : sd.Field<any, any>[] = [];
        for (let columnName in columns) {
            const column = columns[columnName];
            if (uniqueKey[columnName] === true) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
        }
        return sd.schema(...fields) as any;
    }
    export function isEqual (a : UniqueKey, b : UniqueKey) : boolean {
        for (let aKey in a) {
            if (a.hasOwnProperty(aKey) && !b.hasOwnProperty(aKey)) {
                return false;
            }
        }
        for (let bKey in b) {
            if (b.hasOwnProperty(bKey) && !a.hasOwnProperty(bKey)) {
                return false;
            }
        }
        return true;
    }
}