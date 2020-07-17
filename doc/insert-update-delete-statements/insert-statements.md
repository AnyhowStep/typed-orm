### `INSERT`

This library supports a variety of ways to `INSERT` rows to a table.

-----

### Inserting One Row

```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable` elsewhere
 */
import {myTable} from "./table";

const insertResult = await myTable.insert(
    connection,
    {
        //Column values can be literal values
        myColumn0 : 100n,
        //Column values can be expressions
        //`UTC_TIMESTAMP(3)`
        myColumn1 : sql.utcTimestamp(3),
    }
);
```

The above is the same as writing,
```sql
INSERT INTO
    myTable (myColumn0, myColumn1)
VALUES
    (100, UTC_TIMESTAMP(3))
```

-----

If `table` has an auto-increment column,
the `insertResult` will contain the auto-increment value,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable` elsewhere.
 * Assume the auto-increment column name is `myTableId`.
 */
import {myTable} from "./table";

const insertResult = await myTable.insertOne(
    connection,
    {
        //Column values can be literal values
        myColumn0 : 100n,
        //Column values can be expressions
        //`UTC_TIMESTAMP(3)`
        myColumn1 : sql.utcTimestamp(3),
    }
);
//Should be some `bigint` value.
console.log(insertResult.insertId);
//Should be some `bigint` value.
//Convenience property for `insertId`.
console.log(insertResult.myTableId);
```

-----

### Inserting Many Rows

```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable` elsewhere
 */
import {myTable} from "./table";

const insertResult = await sql
    .insertInto(myTable)
    .values(
        {
            //Column values can be literal values
            myColumn0 : 100n,
            //Column values can be expressions
            //`UTC_TIMESTAMP(3)`
            myColumn1 : sql.utcTimestamp(3),
        },
        //...
        //snip, you may have more rows here.
    )
    .execute(connection);
```

The above is the same as writing,
```sql
INSERT INTO
    myTable (myColumn0, myColumn1)
VALUES
    (100, UTC_TIMESTAMP(3)),
    -- ...
    -- snip you may have more rows here.
```

If the array is empty, it does not access the database at all,
because there is nothing to `INSERT`.

-----

### Insert and Fetch

```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable` elsewhere.
 * Assume the auto-increment column name is `myTableId`.
 */
import {myTable} from "./table";

const myRow = await myTable.insertOne(
    connection,
    {
        //Column values can be literal values
        myColumn0 : 100n,
        //Column values can be expressions
        //`UTC_TIMESTAMP(3)`
        myColumn1 : sql.utcTimestamp(3),
    }
);
console.log(myRow.myTableId);
console.log(myRow.myColumn0);
console.log(myRow.myColumn1);
```

Internally, it calls `connection.transactionIfNotInOne(callback)`.
Then, inside the callback, it executes an `INSERT` and `SELECT` statement.

If exactly one row is inserted and fetched, the row is returned.

-----

### `table.insertIgnore()`

Like `table.insert()`, but performs `INSERT IGNORE` instead.

-----

### `insertIgnoreInto()`

Like `insertInto()`, but performs `INSERT IGNORE` instead.

-----

### `table.replace()`

Like `table.insert()`, but performs `REPLACE` instead.

-----

### `replaceInto()`

Like `insertInto()`, but performs `REPLACE` instead.

-----

### `query.insertInto()`

Inserts a result set into a table,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `src`, and `dst` elsewhere.
 */
import {src, dst} from "./table";

const insertResult = await sql
    .from(src)
    .select(columns => [
        columns.testId,
        sql.bigIntAdd(
            columns.testVal,
            BigInt(50)
        ).as("sum")
    ])
    .insertInto(
        connection,
        dst,
        columns => {
            return {
                testId : columns.src.testId,
                testVal : columns.__aliased.sum,
            };
        }
    )
    .execute(connection);
```

The above is the same as writing,
```sql
INSERT INTO
    dst (testId, testVal)
SELECT
    src.testId, (src.testVal + 50)
FROM
    src
```

-----

### `query.insertIgnoreInto()`

Like `query.insertInto()`, but performs `INSERT IGNORE` instead.

-----

### `query.replaceInto()`

Like `query.insertInto()`, but performs `REPLACE` instead.