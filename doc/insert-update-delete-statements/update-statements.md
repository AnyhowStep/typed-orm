### `UPDATE`

This library supports a variety of ways to `UPDATE` rows of a table.

-----

### Overview

These methods allow `UPDATE` statements to have arbitrary `WHERE` clauses,
+ `query.set().execute()`
+ `query.set().executeUpdateOne()`
+ `query.set().executeUpdateZeroOrOne()`

These convenience methods build upon `query.set().executeUpdateOne()`,
+ `table.updateOneByPk()`
+ `table.updateOneByCk()`
+ `table.updateOneBySk()`

These convenience methods build upon `query.set().executeUpdateZeroOrOne()`,
+ `table.updateZeroOrOneByPk()`
+ `table.updateZeroOrOneByCk()`
+ `table.updateZeroOrOneBySk()`

These convenience methods build upon `query.set().executeUpdateOne()`, and fetch the updated row,
+ `table.updateAndFetchOneByPk()`
+ `table.updateAndFetchOneByCk()`
+ `table.updateAndFetchOneBySk()`

These convenience methods build upon `query.set().executeUpdateZeroOrOne()`, and fetch the updated row, if any,
+ `table.updateAndFetchZeroOrOneByPk()`
+ `table.updateAndFetchZeroOrOneByCk()`
+ `table.updateAndFetchZeroOrOneBySk()`

-----

### `AssignmentMapDelegate`

The `AssignmentMapDelegate` type looks something like this,
```ts
type AssignmentMap<TableT, AssignmentMapT> =
    (columns : TableT["columns"]) => AssignmentMapT
;
```

The `AssignmentMap` returned affects what columns are updated, and what the new values will be.

-----

### `query.set().execute()`

Lets you `UPDATE` zero-to-many rows, using an arbitrary `WHERE` clause,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable` elsewhere
 */
import {myTable} from "./table";

const updateResult = await sql.from(myTable)
    .where(columns => sql.gt(
        columns.column0,
        BigInt(199)
    ))
    //This is our `AssignmentMapDelegate`
    .set(columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    })
    .execute(connection);
```

The above is the same as writing,
```sql
UPDATE
    myTable
SET
    myTable.column0 = 50,
    myTable.column1 = myTable.column1 + 100
WHERE
    myTable.column0 > 199
```

-----

### `query.set().executeUpdateOne()`

Like `query.set().execute()`, but ensures exactly one row is updated.

Internally, it calls `connection.transactionIfNotInOne(callback)`.
Then, inside the callback, it executes an `UPDATE` statement.

+ If zero rows are updated, it throws a `RowNotFoundError`.
+ If more than one row is updated, it throws a `TooManyRowsFoundError`.
+ If exactly one row is updated, it returns.

-----

### `query.set().executeUpdateZeroOrOne()`

Like `query.set().execute()`, but ensures exactly zero, or one row is updated.

Internally, it calls `connection.transactionIfNotInOne(callback)`.
Then, inside the callback, it executes an `UPDATE` statement.

+ If more than one row is updated, it throws a `TooManyRowsFoundError`.
+ If exactly zero, or one row is updated, it returns.

-----

### `table.updateOneByPk()`

Every table **should** have one primary key.
The primary key may be made up of one, or more, columns.

Uses `query.set().executeUpdateOne()` internally,
```ts
const updateResult = await myTable.updateOneByPk(
    connection,
    {
        myTablePrimaryKey0,
        myTablePrimaryKey1,
        //etc.
    },
    //This is our `AssignmentMapDelegate`
    columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    }
);
```

Convenience method for,
```ts
const updateResult = await sql.from(myTable)
    .where(() => sql.eqPrimaryKey(
        myTable,
        {
            myTablePrimaryKey0,
            myTablePrimaryKey1,
            //etc.
        }
    ))
    //This is our `AssignmentMapDelegate`
    .set(columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    })
    .executeUpdateOne(connection);
```

-----

### `table.updateOneByCk()`

A primary key **should** be a kind of candidate key.
Therefore, every table **should** have one, or more, candidate keys.
A candidate key may be made up of one, or more, columns.

Uses `query.set().executeUpdateOne()` internally,
```ts
const updateResult = await myTable.updateOneByCk(
    connection,
    {
        myTableCandidateKey0,
        myTableCandidateKey1,
        //etc.
    },
    //This is our `AssignmentMapDelegate`
    columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    }
);
```

Convenience method for,
```ts
const updateResult = await sql.from(myTable)
    .where(() => sql.eqCandidateKey(
        myTable,
        {
            myTableCandidateKey0,
            myTableCandidateKey1,
            //etc.
        }
    ))
    //This is our `AssignmentMapDelegate`
    .set(columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    })
    .executeUpdateOne(connection);
```

-----

### `table.updateOneBySk()`

A super key is made up of a candidate key and zero, or more, non-key columns.

Uses `query.set().executeUpdateOne()` internally,
```ts
const updateResult = await myTable.updateOneBySk(
    connection,
    {
        myTableCandidateKey0,
        myTableCandidateKey1,
        //etc.
        nonKey0,
        nonKey1,
        //etc.
    },
    //This is our `AssignmentMapDelegate`
    columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    }
);
```

Convenience method for,
```ts
const updateResult = await o.from(myTable)
    .where(() => sql.eqSuperKey(
        myTable,
        {
            myTableCandidateKey0,
            myTableCandidateKey1,
            //etc.
            nonKey0,
            nonKey1,
            //etc.
        }
    ))
    //This is our `AssignmentMapDelegate`
    .set(columns => {
        //This is our `AssignmentMap`
        return {
            //Column values can be literal values
            column0 : 50n,
            //Column values can be expressions
            column1 : sql.bigIntAdd(
                columns.column1,
                100n
            ),
        };
    })
    .executeUpdateOne(connection);
```

-----

### `table.updateZeroOrOneByPk()`

Like `table.updateOneByPk()`, but uses `query.set().executeUpdateZeroOrOne()` internally.

-----

### `table.updateZeroOrOneByCk()`

Like `table.updateOneByCk()`, but uses `query.set().executeUpdateZeroOrOne()` internally.

-----

### `table.updateZeroOrOneBySk()`

Like `table.updateOneBySk()`, but uses `query.set().executeUpdateZeroOrOne()` internally.

-----

### `table.updateAndFetchOneByPk()`

Like `table.updateOneByPk()`, but the returned result has a `row` property.
This `row` property contains the updated row with its new values.
```ts
const updateResult = await myTable.updateAndFetchOneByPk(
    //snip
);
/*
    {
        myTableId : //value,
        column0 : //value,
        column1 : //value,
    }
*/
console.log(updateResult.row);
```

-----

### `table.updateAndFetchOneByCk()`

Similar to `table.updateAndFetchOneByPk()`, but for candidate keys.

-----

### `table.updateAndFetchOneBySk()`

Similar to `table.updateAndFetchOneByPk()`, but for super keys.

-----

### `table.updateAndFetchZeroOrOneByPk()`

Like `table.updateAndFetchOneByPk()`, but the `row` property of the returned result
is `undefined` when no rows are found.
```ts
const updateResult = await myTable.updateAndFetchZeroOrOneByPk(
    //snip
);
/*
    Might be,
    {
        myTableId : //value,
        column0 : //value,
        column1 : //value,
    }

    Might be,
    undefined
*/
console.log(updateResult.row);
```

-----

### `table.updateAndFetchZeroOrOneByCk()`

Similar to `table.updateAndFetchZeroOrOneByPk()`, but for candidate keys.

-----

### `table.updateAndFetchZeroOrOneBySk()`

Similar to `table.updateAndFetchZeroOrOneByPk()`, but for super keys.