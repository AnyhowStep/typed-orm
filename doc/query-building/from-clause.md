### `FROM` Clause

Most `SELECT` statements you build will begin with the `FROM` clause.

-----

The simplest way to start,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable` elsewhere
 */
import {myTable} from "./table";

const myQuery = sql.from(myTable);
```

The above is the same as writing,
```sql
FROM
    myTable
```

At the moment, we don't have a `SELECT` statement we can execute yet.

-----

### Non-Equijoin not supported.

This library does not support joins that are not equijoins.

The [`@squill/squill`](https://github.com/AnyhowStep/tsql) library supports joins with arbitrary conditions.

-----

To use non-equijoins with this library,

```ts
sql
    .from(myTable)
    .crossJoin(otherTable)
    .where(columns => /* arbitrary join condition */)
```

The MySQL optimization engine should be able to
translate the query into an `INNER JOIN` with an arbitrary condition.

However, you cannot have a `LEFT JOIN` with an arbitrary condition with
this workaround.

The lack of joins with arbitrary conditions was an oversight with this prototype
as most joins for OLTP queries are equijoins.

-----

### `JOIN`s Overview

At the moment, this library supports the following `JOIN`s,
+ `.crossJoin()`
+ `.innerJoin()`
+ `.leftJoin()`

-----

The following convenience methods build upon `.innerJoin()` and `.leftJoin()` to simplify some common `JOIN` operations,
+ `.xxxJoinPk()`
+ `.xxxJoinFromPk()`
+ `.xxxJoinCkUsing()`
+ `.xxxJoinUsing()`

-----

### `RIGHT JOIN`s

`RIGHT JOIN`s are isomorphic to `LEFT JOIN`s.

Any query using `RIGHT JOIN` can be rewritten to use `LEFT JOIN`.

-----

### `FULL OUTER JOIN`s

MySQL does not support `FULL OUTER JOIN`. So, this library does not support it, either.

-----

### `.crossJoin()`

To use a `CROSS JOIN`,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable`, `otherTable` elsewhere
 */
import {myTable, otherTable} from "./table";

const myQuery = sql
    .from(myTable)
    .crossJoin(otherTable);
```

The above is the same as writing,
```sql
FROM
    myTable
CROSS JOIN
    otherTable
```

-----

### `.innerJoin()/.leftJoin()`

To use an `INNER JOIN`/`LEFT JOIN`,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable`, `otherTable` elsewhere
 */
import {myTable, otherTable} from "./table";

const myQuery = sql
    .from(myTable)
    /**
     * You may substitute this for `.leftJoin()`
     */
    .innerJoin(
        otherTable,
        columns => [
            columns.myTableA,
            columns.myTableB
        ],
        columns => [
            columns.otherTableA,
            columns.otherTableB
        ]
    );
```

The above is the same as writing,
```sql
FROM
    myTable
INNER JOIN
    otherTable
ON
    (myTable.myTableA = otherTable.otherTableA) AND
    (myTable.myTableB = otherTable.otherTableB)
```

-----

### `.innerJoinPk()/.leftJoinPk()`

Usually, when `JOIN`ing tables, we perform an equijoin using the primary key of a table,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const loanedBook = sql
    .table("loanedBook")
    .addColumns({
        loanId : tm.mysql.bigIntSigned(),
        bookId : tm.mysql.varChar(255),
        dueAt : tm.mysql.dateTime(3),
        returnedAt : tm.mysql.dateTime(3).orNull(),
    })
    /**
     * A book may only be lent out once per loan.
     */
    .setPrimaryKey(columns => [
        columns.loanId,
        columns.bookId,
    ]);
const fine = sql
    .table("fine")
    .addColumns({
        fineId : tm.mysql.bigIntSigned(),
        loanId : tm.mysql.bigIntSigned(),
        bookId : tm.mysql.varChar(255),
        amount : tm.mysql.bigIntSigned(),
        createdAt : tm.mysql.dateTime(3),
        paidAt : tm.mysql.dateTime(3).orNull(),
    })
    /**
     * A `loanedBook` may incur multiple fines,
     * particularly if they are overdue and fines are ignored.
     */
    .setAutoIncrement(columns => columns.fineId)
    .addHasExplicitDefaultValue(columns => [
        columns.createdAt,
    ]);

const myQuery = sql
    .from(fine)
    /**
     * You may substitute this for `.leftJoinPk()`
     */
    .innerJoinPk(
        tables => tables.fine,
        /**
         * Has primary key (loanId, bookId)
         */
        loanedBook
    );
```

The above is the same as writing,
```sql
FROM
    fine
INNER JOIN
    loanedBook
ON
    (fine.loanId = loanedBook.loanId) AND
    (fine.bookId = loanedBook.bookId)
```

-----

### `.innerJoinFromPk()/.leftJoinFromPk()`

`.innerJoinFromPk()` is similar to `.innerJoinPk()`,
but uses a different table's primary key for the equijoin.

```ts
const myQuery = sql
    .from(loanedBook)
    /**
     * You may substitute this for `.leftJoinFromPk()`
     */
    .innerJoinFromPk(
        /**
         * Has primary key (loanId, bookId)
         */
        tables => tables.loanedBook,
        fine
    );
```

The above is the same as writing,
```sql
FROM
    loanedBook
INNER JOIN
    fine
ON
    (loanedBook.loanId = fine.loanId) AND
    (loanedBook.bookId = fine.bookId)
```

-----

### `.innerJoinCkUsing()/.leftJoinCkUsing()`

You may also perform an equijoin using candidate keys of a table,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const reservation = sql
    .table("reservation")
    .addColumns({
        userId : tm.mysql.bigIntSigned(),
        roomId : tm.mysql.varChar(255),
        timeSlotId : tm.mysql.bigIntSigned(),
    })
    /**
     * A user may only have one reservation per time-slot
     */
    .addCandidateKey(columns => [
        columns.userId,
        columns.timeSlotId,
    ])
    /**
     * A room may only be reserved once per time-slot
     */
    .addCandidateKey(columns => [
        columns.roomId,
        columns.timeSlotId,
    ]);
const cateredFood = sql
    .table("cateredFood")
    .addColumns({
        roomId : tm.mysql.varChar(255),
        timeSlotId : tm.mysql.bigIntSigned(),
        foodId : tm.mysql.bigIntSigned(),
        quantity : tm.mysql.bigIntSigned(),
    })
    /**
     * A reservation may have multiple kinds of food catered.
     * Each kind of food should only be recorded once per reservation.
     */
    .setPrimaryKey(columns => [
        columns.roomId,
        columns.timeSlotId,
        columns.foodId,
    ]);

const myQuery = sql
    .from(cateredFood)
    /**
     * You may substitute this for `.leftJoinCkUsing()`
     */
    .innerJoinCkUsing(
        reservation,
        /**
         * Must be a candidate key of `reservation`
         */
        columns => [columns.roomId, columns.timeSlotId]
    );
```

The above is the same as writing,
```sql
FROM
    cateredFood
INNER JOIN
    reservation
ON
    (cateredFood.roomId = reservation.roomId) AND
    (cateredFood.timeSlotId = reservation.timeSlotId)
```

-----

### `.innerJoinUsing()/.leftJoinUsing()`

An equijoin may be used on non-key columns,
```ts
const myQuery = sql
    .from(myTable)
    /**
     * You may substitute this for `.leftJoinUsing()`
     */
    .innerJoinUsing(
        otherTable,
        /**
         * Does not need to be a key
         */
        columns => [columns.nonKeyA, columns.nonKeyB]
    );
```

The above is the same as writing,
```sql
FROM
    myTable
INNER JOIN
    otherTable
ON
    (myTable.nonKeyA = otherTable.nonKeyA) AND
    (myTable.nonKeyB = otherTable.nonKeyB)
```

-----

### `INNER JOIN` vs `LEFT JOIN`

When a table is `INNER JOIN`'d we say that the table is a **non-nullable** join,
+ Non-nullable columns in the table **will not** have `NULL` values.
+ Nullable columns in the table may have `NULL` values.

When a table is `LEFT JOIN`'d we say that the table is a **nullable** join,
+ Non-nullable columns in the table **may** have `NULL` values.
+ Nullable columns in the table may have `NULL` values.