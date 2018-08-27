import {Column, AnyColumn} from "../column";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {Tuple} from "../tuple";
import {UniqueKeyCollection} from "../unique-key-collection";
import {AnyTable} from "../table";

export interface TableData {
    //TODO, Maybe allow string?
    //The maximum value `UNSIGNED BIGINT` can have is
    //18446744073709551615
    //which is 2^(32*8)-1 because `UNSIGNED BIGINT` uses 8 bytes.

    //This cannot be represented correctly with JS' `number` type,
    //which should be an 8-byte floating point,
    //The precision is 15 siginificant digits, and
    //`UNSIGNED BIGINT` can have up to 20 digits...
    //15 digits is still, like, 999,999,999,999,999, though
    readonly autoIncrement : undefined|Column<any, any, number>;
    //If a column is generated, you must specify as such manually.
    //Setting generated column values will not be allowed with INSERT statements.
    //Updating generated column values will also not be allowed with UPDATE statements.
    readonly isGenerated : {
        [name : string] : true;
    }
    //If a column is nullable, it has a server default value of `NULL`.
    //If a column is NOT nullable, but has a server default value,
    //like CURRENT_TIMESTAMP or some other value,
    //you will have to specify as such manually.
    //If a column is a GENERATED column, then it also has a server default value.
    //Columns with server default values are optional with INSERT statements.
    readonly hasDefaultValue : {
        [name : string] : true;
    };
    //By default, all non-generated columns of the table are mutable.
    //Calling setMutable() will set only the specified columns as mutable.
    //Calling setImmutable() will make them all immutable.
    //Generated columns cannot be mutable.
    readonly isMutable : {
        [name : string] : true;
    };

    //A table can have a PK that is an FK to an auto-increment column in another table
    readonly id : undefined|Column<any, any, number>;
    readonly uniqueKeys : undefined|(UniqueKeyCollection);

    /*
        A parent table must be instantiated before the child table.

        The parent and child table must share at least one unique key (usually the `id`)

        If there are duplicate column names, it is assumed there
        is an FK of that column from the child table to the
        parent table, and that the child's column type is assignable
        to the parent's column type.

        An example would be "discriminator" columns used in exclusive
        inheritance. The parent table could have a column, `appKeyType`,
        which would be `BROWSER|SERVER`. The child table would, then,
        have a column called `appKeyType` with `SERVER` as the only value.

        We outline some possibilities for duplicate columns,

        Child       | Parent        |
        generated   | generated     | When inserting, the column value is ignored
        generated   | has default   | The child column's generated value must be a numeric string
        generated   | no default    | The child column's generated value must be a numeric string

        has default | generated     | The parent column must a unique key we can use to retrieve after insertion, to get the value
        has default | has default   | If value is provided, it'll set both to the value, otherwise, it lets the defaults be set
        has default | no default    | The value must be provided, it'll set both to the value

        no default  | generated     | The parent column must a unique key we can use to retrieve after insertion, to get the value
        no default  | has default   | The parent column must a unique key we can use to retrieve after insertion, to get the value
        no default  | no default    | The value must be provided, it'll set both to the value
    */
    readonly parentTables : undefined|Tuple<AnyTable>;
    //Defaults to `false`
    readonly noInsert : boolean;
}

//The `number` requirement is only a compile-time constraint
export type AutoIncrementDelegate<ColumnCollectionT extends ColumnCollection> = (
    (columns : {
        [columnName in keyof ColumnCollectionT] : (
            ColumnCollectionT[columnName] extends Column<any, any, number> ?
                ColumnCollectionT[columnName] :
                never
        )
    }) => (
        Extract<
            ColumnCollectionUtil.Columns<ColumnCollectionT>,
            Column<any, any, number>
        >
    )
);

//Auto increment columns are already considered generated
export type IsGeneratedDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = (
    (columns : ColumnCollectionUtil.ExcludeColumnNames<
        ColumnCollectionT,
        DataT["autoIncrement"] extends AnyColumn ?
            DataT["autoIncrement"]["name"] :
            never
    >) => Tuple<
        ColumnCollectionUtil.Columns<
            ColumnCollectionUtil.ExcludeColumnNames<
                ColumnCollectionT,
                DataT["autoIncrement"] extends AnyColumn ?
                    DataT["autoIncrement"]["name"] :
                    never
            >
        >
    >
);
//Generated columns are already considered to have default server values
export type HasDefaultValueDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = (
    (columns : ColumnCollectionUtil.ExcludeColumnNames<
        ColumnCollectionT,
        Extract<keyof DataT["isGenerated"], string>
    >) => Tuple<
        ColumnCollectionUtil.Columns<
            ColumnCollectionUtil.ExcludeColumnNames<
                ColumnCollectionT,
                Extract<keyof DataT["isGenerated"], string>
            >
        >
    >
);
//Generated columns cannot be mutable
export type IsMutableDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = (
    (columns : ColumnCollectionUtil.ExcludeColumnNames<
        ColumnCollectionT,
        Extract<keyof DataT["isGenerated"], string>
    >) => Tuple<
        ColumnCollectionUtil.Columns<
            ColumnCollectionUtil.ExcludeColumnNames<
                ColumnCollectionT,
                Extract<keyof DataT["isGenerated"], string>
            >
        >
    >
);
//The `number` requirement is only a compile-time constraint
export type IdDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection, > = (
    (
        columns : (
            DataT["autoIncrement"] extends AnyColumn ?
                //We already have an auto-increment column
                {} :
                {
                    [columnName in keyof ColumnCollectionT] : (
                        ColumnCollectionT[columnName] extends Column<any, any, number> ?
                            ColumnCollectionT[columnName] :
                            never
                    )
                }
        )
    ) => (
        DataT["autoIncrement"] extends AnyColumn ?
            //We already have an auto-increment column
            never :
            Extract<
                ColumnCollectionUtil.Columns<ColumnCollectionT>,
                Column<any, any, number>
            >
    )
);
export type AddUniqueKeyDelegate<ColumnCollectionT extends ColumnCollection> = (
    (columns : ColumnCollectionT) => Tuple<
        ColumnCollectionUtil.Columns<ColumnCollectionT>
    >
);
