### Data Types

Reading data from MySQL requires deserializing data into a value we can use in JS.

We use a **mapper** function to perform the necessary deserialization.

The [`SafeMapper<T>`](https://github.com/AnyhowStep/type-mapping/blob/2fb300d8b05a66ceebe9d19a803ebbc0ff33d7ba/src/mapper/safe-mapper.ts#L16) type has the following signature,

```ts
type SafeMapper<T> = (name : string, mixed : unknown) => T,
```

When declaring a table's columns, you will need to specify the **data type** of the column
by passing a **mapper** function to it that can deserialize values from MySQL appropriately.

Note that mapper functions can only run on the client to perform validation/deserialization.

-----

The [`type-mapping`](https://github.com/AnyhowStep/type-mapping) package has a `mysql` namespace that covers the most common use cases,

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

enum MyEnum {
    A = 1,
    B = 2,
    C = 3,
}

const book = sql.table("book")
    .addColumns({
        /**
         * A `VARCHAR(255)` column with 1 to 255 characters.
         * Note that this length validation is client-side only.
         * 
         * TS Type: `string`
         */
        varCharColumn : tm.mysql.varChar(1, 255),
        /**
         * A nullable `VARCHAR(255)` column.
         * 
         * You may use the `.orNull()` method to make any data type nullable.
         * 
         * TS Type: `string|null`
         */
        varCharOrNullColumn : tm.mysql.varChar(1, 255).orNull(),

        /**
         * A `DATETIME(0)` column; precision up to 1 second.
         * 
         * TS Type: JS `Date`
         */
        dateTime0Column : tm.mysql.dateTime(0),
        /**
         * A `DATETIME(3)` column; precision up to 1 millisecond.
         * 
         * If possible, you should use `DATETIME(3)` on your database if you're only using the database with JS,
         * because JS' `Date` object has millisecond precision.
         * 
         * TS Type: JS `Date`
         */
        dateTime3Column : tm.mysql.dateTime(3),

        /**
         * A `BIGINT UNSIGNED` column.
         * 
         * TS Type: `bigint`
         */
        bigIntUnsignedColumn : tm.mysql.bigIntUnsigned(),
        /**
         * A `BIGINT SIGNED` column.
         * 
         * TS Type: `bigint`
         */
        bigIntSignedColumn : tm.mysql.bigIntSigned(),
        
        /**
         * A `BOOLEAN/TINYINT(1)` column.
         * 
         * TS Type: `boolean`
         */
        booleanColumn : tm.mysql.boolean(),

        /**
         * A `DOUBLE` column.
         * 
         * TS Type: `number`
         */
        doubleColumn : tm.mysql.double(),

        /**
         * A `BLOB` column.
         * 
         * TS Type: node.js `Buffer`
         */
        blobColumn : tm.mysql.blob(),
        /**
         * A `TEXT` column.
         * 
         * TS Type: `string`
         */
        textColumn : tm.mysql.text(),

        /**
         * A `DOUBLE` or `BIGINT` column with values `1, 2, 3`
         * 
         * TS Type: `1|2|3` or `MyEnum.A|MyEnum.B|MyEnum.C` or `MyEnum`
         */
        enumValueColumn : tm.mysql.enumValue(MyEnum),
    })
```

Source code for the `mysql` namespace may be found [here](https://github.com/AnyhowStep/type-mapping/tree/master/src/mysql-lib).

If a data type you want to use is not part of the `mysql` namespace, you will have to create your own mapper function.