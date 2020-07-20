### `WHERE` Clause

The `WHERE` clause lets you specify a condition rows must satisfy to be part of the result set.

-----

### 2-valued Logic vs 3-valued Logic

MySQL allows conditions that evaluate to `NULL`, and supports 3-valued logic.

+ If a condition is `TRUE` for a row, it is included in the result set.
+ If a condition is `FALSE` or `NULL` for a row, it is **excluded** from the result set.

-----

This library is **highly opinionated** and **will not** allow 3-valued logic for the `WHERE` clause.

You should use `COALESCE()`/`IS TRUE`/`IS FALSE`/`IS UNKNOWN` to convert any `NULL` values
to `TRUE`/`FALSE`.

In general, allowing `NULL` values in the `WHERE` clause indicates sloppy logic.

-----

By forcing the `WHERE` clause to only allow 2-valued logic,
we make our queries safer by explicitly deciding how to handle potentially ambiguous cases.

-----

For example,
```sql
SELECT
    *
FROM
    person
WHERE
    (
        SELECT
            organDonationConsent.consented
        FROM
            organDonationConsent
        WHERE
            person.personId = organDonationConsent.personId
        ORDER BY
            organDonationConsent.occurredAt DESC
        LIMIT
            1
    )
```

The above query attempts to `SELECT` all `person`s that have `consented` to organ donation.

However, it is possible for the subquery in the `WHERE` clause to evaluate to `NULL`.
Particularly if the `person` has no matching rows in `organDonationConsent`.

-----

When the subquery evaluates to `NULL`, has the `person` consented to organ donation or not?

In some countries, the lack of explicit consent/refusal implies **consent**.
In others, it implies **refusal**.

If all `person`s lacking explicit consent/refusal are assumed to have `consented`,
then the above query will return fewer rows than expected!

If **consent** is implied, we should rewrite the query,
```sql
SELECT
    *
FROM
    person
WHERE
    -- If the `person` has no record of being consenting/refusing,
    -- we assume the `person` has `consented`
    -- Alternatively, we can use `x IS TRUE` instead of `COALESCE(x, TRUE)`
    COALESCE(
        (
            SELECT
                organDonationConsent.consented
            FROM
                organDonationConsent
            WHERE
                person.personId = organDonationConsent.personId
            ORDER BY
                organDonationConsent.occurredAt DESC
            LIMIT
                1
        ),
        TRUE
    )
```

-----

### `WHERE` Overview

The most basic method to build the `WHERE` clause,
+ `.where(whereDelegate)`

These methods build upon `.where()` to simplify common `WHERE` clause conditions,
+ `.whereEqPk(tableDelegate, primaryKey)`
+ `.whereEqCk(tableDelegate, candidateKey)`
+ `.whereEqSk(tableDelegate, superKey)`
+ `.whereEqColumns(tableDelegate, row)`
+ ~~`.whereEqOuterQueryPrimaryKey(srcDelegate, dstDelegate)`~~

These methods let you **narrow** the type of columns in the `FROM` clause,
+ `.whereEq(columnDelegate, value)`
+ `.whereNullSafeEq(columnDelegate, value)`
+ `.whereIsNull(columnDelegate)`
+ `.whereIsNotNull(columnDelegate)`

-----

### `.where()`

An arbitrary `WHERE` clause may be specified with,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable`, `otherTable` elsewhere
 */
import {myTable, otherTable} from "./table";

const myQuery0 = sql
    .from(myTable)
    /**
     * With only one table in the `FROM` clause,
     * we do not need to qualify columns with a table name.
     */
    .where(columns => sql.gt(
        /**
         * This refers to `myTable.myColumn`
         */
        columns.myColumn,
        9000n
    ));
```

The above is the same as writing,
```sql
FROM
    myTable
WHERE
    myTable.myColumn > 9000
```

-----

```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable`, `otherTable` elsewhere
 */
import {myTable, otherTable} from "./table";

const myQuery = sql
    .from(myTable)
    .innerJoinPk(
        tables => tables.myTable
        otherTable
    )
    /**
     * With multiple tables in the `FROM` clause,
     * we need to qualify columns with a table name.
     */
    .where(columns => sql.and(
        sql.gt(
            /**
             * This refers to `myTable.myColumn`
             */
            columns.myTable.myColumn,
            9000n
        ),
        sql.eq(
            /**
             * This refers to `otherTable.otherColumn`
             */
            columns.otherTable.otherColumn,
            69n
        )
    ));
```

The above is the same as writing,
```sql
FROM
    myTable
INNER JOIN
    otherTable
ON
    -- innerJoinPk()
    -- Assume `otherTableId` is the primary key of `otherTable`
    myTable.otherTableId = otherTable.otherTableId
WHERE
    (myTable.myColumn > 9000) AND
    (otherTable.otherColumn = 69)
```

-----

You may call the `.where()` method repeatedly.
Each invocation `AND`s the current and new conditions.

```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable`, `otherTable` elsewhere
 */
import {myTable, otherTable} from "./table";

const myQuery = sql
    .from(myTable)
    .innerJoinPk(
        tables => tables.myTable
        otherTable
    )
    /**
     * With multiple tables in the `FROM` clause,
     * we need to qualify columns with a table name.
     */
    .where(columns => sql.gt(
        columns.myTable.myColumn,
        9000n
    ))
    .where(columns => sql.eq(
        columns.otherTable.otherColumn,
        69n
    )
    .where(columns => sql.isNotNull(
        columns.otherTable.otherColumn2
    );
```

The above is the same as writing,
```sql
FROM
    myTable
INNER JOIN
    otherTable
ON
    -- innerJoinPk()
    -- Assume `otherTableId` is the primary key of `otherTable`
    myTable.otherTableId = otherTable.otherTableId
WHERE
    (myTable.myColumn > 9000) AND
    (otherTable.otherColumn = 69) AND
    (otherTable.otherColumn2 IS NOT NULL)
```

-----

### `.whereEqPk()`

A convenience method that lets you keep rows that match a given primary key value,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const loanedBook = sql.table("loanedBook")
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

const myQuery = sql.from(loanedBook)
    .whereEqPk(
        loanedBook,
        {
            loanId : 1337n,
            bookId : "ISBN-13: 9781492037651",
        }
    );
```

The above is the same as writing,
```sql
FROM
    loanedBook
WHERE
    (loanedBook.loanId = 1337) AND
    (loanedBook.bookId = 'ISBN-13: 9781492037651')
```

It is recommended to **only** pass **object literals** to `.whereEqPk()`.
Excess property checks are disabled for non-object literals.
Even if they were enabled, it would still be possible to slip in extra properties.

Properties not part of the primary key are ignored during run-time but may indicate lapses in logic.

-----

### `.whereEqCk()`

A convenience method that lets you keep rows that match a given candidate key value,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const reservation = sql.table("reservation")
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

const myQuery = sql.from(reservation)
    .whereEqCk(
        tables => tables.reservation,
        {
            roomId : "Red Room",
            timeSlotId : 999n,
        }
    );
```

The above is the same as writing,
```sql
FROM
    reservation
WHERE
    -- `<=>` is MySQL's null-safe equality operator
    (reservation.roomId <=> 'Red Room') AND
    (reservation.timeSlotId <=> 999)
```

Candidate keys may contain nullable columns. So, `.whereEqCk()` internally uses [null-safe equality](../expressions/null-safe-equality.md).

It is recommended to **only** pass **object literals** to `.whereEqCk()`.
Excess property checks are disabled for non-object literals.
Even if they were enabled, it would still be possible to slip in extra properties.

Properties not part of a candidate key are ignored during run-time but may indicate lapses in logic.

-----

### `.whereEqSk()`

A convenience method that lets you keep rows that match a given super key value,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const reservation = sql.table("reservation")
    .addColumns({
        userId : tm.mysql.bigIntSigned(),
        roomId : tm.mysql.varChar(255),
        timeSlotId : tm.mysql.bigIntSigned(),
        extraInformationNoOneCaresAbout : tm.mysql.varChar(255),
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

const myQuery = sql.from(reservation)
    .whereEqSk(
        tables => tables.reservation,
        {
            roomId : "Red Room",
            timeSlotId : 999n,
            extraInformationNoOneCaresAbout : "Hello, world!",
        }
    );
```

The above is the same as writing,
```sql
FROM
    reservation
WHERE
    -- `<=>` is MySQL's null-safe equality operator
    (reservation.roomId <=> 'Red Room') AND
    (reservation.timeSlotId <=> 999)
    (reservation.extraInformationNoOneCaresAbout <=> 'Hello, world!')
```

Super keys may contain nullable columns. So, `.whereEqSuperKey()` internally uses [null-safe equality](../expressions/null-safe-equality.md).

It is recommended to **only** pass **object literals** to `.whereEqSuperKey()`.
Excess property checks are disabled for non-object literals.
Even if they were enabled, it would still be possible to slip in extra properties.

Properties not part of a super key are ignored during run-time but may indicate lapses in logic.

-----

### `.whereEqColumns()`

A convenience method that lets you keep rows that match a given set of values,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const cateredFood = sql.table("cateredFood")
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

const myQuery = sql.from(cateredFood)
    .whereEqColumns(
        tables => tables.cateredFood,
        {
            foodId : 80085n,
            quantity : 777n,
        }
    );
```

The above is the same as writing,
```sql
FROM
    cateredFood
WHERE
    -- `<=>` is MySQL's null-safe equality operator
    (cateredFood.foodId <=> 80085) AND
    (cateredFood.quantity <=> 777)
```

Columns may contain `NULL` values. So, `.whereEqColumns()` internally uses [null-safe equality](../expressions/null-safe-equality.md).

It is recommended to **only** pass **object literals** to `.whereEqColumns()`.
Excess property checks are disabled for non-object literals.
Even if they were enabled, it would still be possible to slip in extra properties.

Properties not part of the table's columns are ignored during run-time but may indicate lapses in logic.

-----

### ~~`.whereEqOuterQueryPrimaryKey()`~~

This is not implemented in this library, but is a part of [`@squill/squill`](https://github.com/AnyhowStep/tsql)

This is a convenience method meant for [correlated subqueries](correlated-subqueries.md).
Often times, when we have a correlated subquery, we're just interested in the rows that match a table's primary key.
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const criminalRecord = sql.table("criminalRecord")
    .addColumns({
        criminalRecordId : tm.mysql.bigIntSigned(),
        personId : tm.mysql.bigIntSigned(),
        dateOfOffense : tm.mysql.dateTime(3),
        description : tm.mysql.longText(),
    })
    .setAutoIncrement(columns => columns.criminalRecordId);

const hasCriminalRecord = sql.exists(
    sql
        //Assume a `person` table exists with primary key `(personId)`
        .requireParentJoins(person)
        .from(criminalRecord)
        .whereEqOuterQueryPrimaryKey(
            tables => tables.criminalRecord,
            outerTables => outerTables.person
        )
);
```

The above is the same as writing,
```sql
EXISTS (
    SELECT
        *
    FROM
        criminalRecord
    WHERE
        -- `<=>` is MySQL's null-safe equality operator
        criminalRecord.personId <=> person.personId
)
```

The columns being checked for equality may contain `NULL` values. So, `.whereEqOuterQueryPrimaryKey()` internally uses [null-safe equality](../expressions/null-safe-equality.md).

-----

This feature may be emulated in this library with,
```ts
const hasCriminalRecord = sql.exists(
    sql
        //Assume a `person` table exists with primary key `(personId)`
        .requireParentJoins(person)
        .from(criminalRecord)
        .where(
            sql.innerJoinPk(
                criminalRecord,
                person
            ).eq
        )
);
```

-----

### `.whereEq()`

The `.whereEq()` method narrows the type of **non-nullable** columns,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const customer = sql.table("customer")
    .addColumns({
        customerId : tm.mysql.bigIntSigned(),
        emailAddress : tm.mysql.varChar(255),
        rewardsPoints : tm.mysql.bigIntSigned(),
    })
    .setAutoIncrement(columns => columns.customerId);

sql.from(customer)
    .whereEq(
        columns => columns.customerId,
        1n
    )
    .select(columns => [columns])
    //Assume we have this magical connection object acquired
    .fetchOne(connection)
    .then((row) => {
        /**
         * The type of `row` is inferred as,
         * { customerId : 1n, emailAddress : string, rewardsPoints : bigint }
         *
         * Notice that `customerId`'s type was narrowed from `bigint` to `1n`
         */
        console.log(row);
    });
```

The above is the same as writing,
```sql
SELECT
    -- This will always be the value `1`
    -- It can't be any other value because our `WHERE` clause
    -- filters out all other values except `1`
    customer.customerId,
    -- An arbitrary string
    customer.emailAddress,
    -- An arbitrary integer
    customer.rewardsPoints
FROM
    customer
WHERE
    -- Our very first customer!
    customer.customerId = 1
```

TODO `string` types **should not** be narrowed to literal values because `.whereEq()` should assume case-insensitive string equality.

-----

### `.whereNullSafeEq()`

The `.whereNullSafeEq()` method narrows the type of **nullable** columns,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const loanedBook = sql.table("loanedBook")
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

sql.from(loanedBook)
    .whereNullSafeEq(
        columns => columns.returnedAt,
        new Date("2010-01-01T00:00:00.000Z")
    )
    .select(columns => [columns])
    //Assume we have this magical connection object acquired
    .fetchAll(connection)
    .then((rows) => {
        /**
         * The type of `rows` is inferred as,
         * { loanId : bigint, bookId : string, dueAt : Date, returnedAt : Date }[]
         *
         * Notice that `returnedAt`'s type was narrowed from `Date|null` to `Date`
         */
        console.log(rows);
    });
```

The above is the same as writing,
```sql
SELECT
    -- An arbitrary integer
    loanedBook.loanId,
    -- An arbitrary string
    loanedBook.bookId,
    -- An arbitrary Date
    loanedBook.dueAt,
    -- This will always be the value `Date`
    -- It can't be any other value because our `WHERE` clause
    -- filters out all other values except `Date`
    loanedBook.returnedAt
FROM
    loanedBook
WHERE
    -- Which books where returned on 2010, New Year's Day, midnight?
    -- `<=>` is MySQL's null-safe equality operator
    loanedBook.returnedAt <=> '2010-01-01 00:00:00.000'
```

TODO `string` types **should not** be narrowed to literal values because `.whereEq()` should assume case-insensitive string equality.

-----

### `.whereIsNull()`

The `.whereIsNull()` method narrows the type of **nullable** columns,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const loanedBook = sql.table("loanedBook")
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

sql.from(loanedBook)
    .whereIsNull(
        columns => columns.returnedAt
    )
    .select(columns => [columns])
    //Assume we have this magical connection object acquired
    .fetchAll(connection)
    .then((rows) => {
        /**
         * The type of `rows` is inferred as,
         * { loanId : bigint, bookId : string, dueAt : Date, returnedAt : null }[]
         *
         * Notice that `returnedAt`'s type was narrowed from `Date|null` to `null`
         */
        console.log(rows);
    });
```

The above is the same as writing,
```sql
SELECT
    -- An arbitrary integer
    loanedBook.loanId,
    -- An arbitrary string
    loanedBook.bookId,
    -- An arbitrary Date
    loanedBook.dueAt,
    -- This will always be the value `null`
    -- It can't be any other value because our `WHERE` clause
    -- filters out all other values except `null`
    loanedBook.returnedAt
FROM
    loanedBook
WHERE
    -- Which books have not been returned yet?
    loanedBook.returnedAt IS NULL
```

-----

### `.whereIsNotNull()`

The `.whereIsNotNull()` method narrows the type of **nullable** columns,
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const loanedBook = sql.table("loanedBook")
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

sql.from(loanedBook)
    .whereIsNotNull(
        columns => columns.returnedAt
    )
    .select(columns => [columns])
    //Assume we have this magical connection object acquired
    .fetchAll(connection)
    .then((rows) => {
        /**
         * The type of `rows` is inferred as,
         * { loanId : bigint, bookId : string, dueAt : Date, returnedAt : Date }[]
         *
         * Notice that `returnedAt`'s type was narrowed from `Date|null` to `Date`
         */
        console.log(rows);
    });
```

The above is the same as writing,
```sql
SELECT
    -- An arbitrary integer
    loanedBook.loanId,
    -- An arbitrary string
    loanedBook.bookId,
    -- An arbitrary Date
    loanedBook.dueAt,
    -- This will always be the value `Date`
    -- It can't be any other value because our `WHERE` clause
    -- filters out all other values except `Date`
    loanedBook.returnedAt
FROM
    loanedBook
WHERE
    -- Which books have been returned?
    loanedBook.returnedAt IS NOT NULL
```