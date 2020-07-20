### `DELETE`

This library supports a variety of ways to `DELETE` rows from a table.

-----

### Overview

These methods allow `DELETE` statements to have arbitrary `WHERE` clauses,
+ `query.delete().execute()`
+ `DeleteUtil.deleteOne()`
+ `DeleteUtil.deleteZeroOrOne()`

These convenience methods build upon `DeleteUtil.deleteOne()`,
+ `table.deleteOneByPk()`
+ `table.deleteOneByCk()`
+ `table.deleteOneBySk()`

These convenience methods build upon `DeleteUtil.deleteZeroOrOne()`,
+ `table.deleteZeroOrOneByPk()`
+ `table.deleteZeroOrOneByCk()`
+ `table.deleteZeroOrOneBySk()`

-----

### `query.delete().execute()`

Lets you `DELETE` zero-to-many rows, using an arbitrary `WHERE` clause,
```ts
import * as tsql from "@tsql/tsql";
/**
 * Assume we already defined `myTable` elsewhere
 */
import {myTable} from "./table";

const deleteResult = await myTable.delete(
    connection,
    columns => tsql.gt(
        columns.column0,
        BigInt(199)
    )
);
```

The above is the same as writing,
```sql
DELETE FROM
    myTable
WHERE
    myTable.column0 > 199
```

-----

### `DeleteUtil.deleteOne()`

Like `query.delete().execute()`, but ensures exactly one row is deleted.

Internally, it calls `connection.transactionIfNotInOne(callback)`.
Then, inside the callback, it executes a `DELETE` statement.

+ If zero rows are deleted, it throws a `RowNotFoundError`.
+ If more than one row is deleted, it throws a `TooManyRowsFoundError`.
+ If exactly one row is deleted, it returns.

-----

### `DeleteUtil.deleteZeroOrOne()`

Like `query.delete().execute()`, but ensures exactly zero, or one row is deleted.

Internally, it calls `connection.transactionIfNotInOne(callback)`.
Then, inside the callback, it executes a `DELETE` statement.

+ If more than one row is deleted, it throws a `TooManyRowsFoundError`.
+ If exactly zero, or one row is deleted, it returns.

-----

### `table.deleteOneByPk()`

Every table **should** have one primary key.
The primary key may be made up of one, or more, columns.

Uses `DeleteUtil.deleteOne()` internally,
```ts
const deleteResult = await myTable.deleteOneByPk(
    connection,
    {
        myTablePrimaryKey0,
        myTablePrimaryKey1,
        //etc.
    }
);
```

Convenience method for,
```ts
const deleteResult = await myTable.deleteOne(
    connection,
    () => tsql.eqPrimaryKey(
        myTable,
        {
            myTablePrimaryKey0,
            myTablePrimaryKey1,
            //etc.
        }
    )
);
```

-----

### `table.deleteOneByCk()`

A primary key **should** be a kind of candidate key.
Therefore, every table **should** have one, or more, candidate keys.
A candidate key may be made up of one, or more, columns.

Uses `DeleteUtil.deleteOne()` internally,
```ts
const deleteResult = await myTable.deleteOneByCk(
    connection,
    {
        myTableCandidateKey0,
        myTableCandidateKey1,
        //etc.
    }
);
```

Convenience method for,
```ts
const deleteResult = await myTable.deleteOne(
    connection,
    () => tsql.eqCandidateKey(
        myTable,
        {
            myTableCandidateKey0,
            myTableCandidateKey1,
            //etc.
        }
    )
);
```

-----

### `table.deleteOneBySk()`

A super key is made up of a candidate key and zero, or more, non-key columns.

Uses `DeleteUtil.deleteOne()` internally,
```ts
const deleteResult = await myTable.deleteOneBySk(
    connection,
    {
        myTableCandidateKey0,
        myTableCandidateKey1,
        //etc.
        nonKey0,
        nonKey1,
        //etc.
    }
);
```

Convenience method for,
```ts
const deleteResult = await myTable.deleteOne(
    connection,
    () => tsql.eqSuperKey(
        myTable,
        {
            myTableCandidateKey0,
            myTableCandidateKey1,
            //etc.
            nonKey0,
            nonKey1,
            //etc.
        }
    )
);
```

-----

### `table.deleteZeroOrOneByPk()`

Like `table.deleteOneByPk()`, but uses `DeleteUtil.deleteZeroOrOne()` internally.

-----

### `table.deleteZeroOrOneByCk()`

Like `table.deleteOneByCk()`, but uses `DeleteUtil.deleteZeroOrOne()` internally.

-----

### `table.deleteZeroOrOneBySk()`

Like `table.deleteOneBySk()`, but uses `DeleteUtil.deleteZeroOrOne()` internally.