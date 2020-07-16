### Declaring the primary key

There are two ways to declare a primary key,
+ `.setAutoIncrement()`
+ `.setPrimaryKey()`

A primary key is a candidate key that we designate as **the** candidate key we wish to use in most cases.

A primary key must also not have nullable columns.

It is recommended for every table to have a primary key.

-----

### Highly Recommended Practice

This library's query-building features work best when you follow these recommendations,

+ **DO NOT** use `"id"` as the name of primary key columns!
+ **DO** use the more descriptive `entityName + "Id"` as the name of primary key columns!

Given tables `user`, `book`, and `read`, the following primary keys are bad,
+ `user (id)`
+ `book (id)`
+ `read (userId, bookId)`

The following primary keys are good,
+ `user (userId)`
+ `book (bookId)`
+ `read (userId, bookId)`

-----

If you wish, you may continue to use `"id"` as a column name.

However, you will lose access to many convenience functions relation to JOIN operations,
when building queries.

The difference is,

```sql
INNER JOIN
	"user"
ON
	"user".id = "read".userId
INNER JOIN
	"book"
ON
	"book".id = "read".bookId
```

vs

```sql
INNER JOIN
	"user"
USING (userId)
INNER JOIN
	"book"
USING (bookId)
```

Most joins are equijoins on PKs/FKs.
Taking advantage of the `USING` clause by having PKs/FKs with the same name increases readability and reduces mistakes.

-----

### `.setAutoIncrement()`

An auto-increment column has a unique value generated for it when a new row is inserted (if no value is explicitly assigned).

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const myTable = sql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntSigned(),
        title : tm.mysql.varChar(255),
    })
    .setAutoIncrement(columns => columns.myTableId);
```

-----

### `.setPrimaryKey()`

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const pageOfBook = sql.table("pageOfBook")
    .addColumns({
        bookId : tm.mysql.bigIntSigned(),
        pageNumber : tm.mysql.bigIntSigned(),
        content : tm.mysql.longText(),
    })
    .setPrimaryKey(columns => [
        columns.bookId,
        columns.pageNumber,
    ]);
```

-----

### Explicit Auto-Increment Values

This library has a strong opinion that you should not explicitly set the value of auto-increment columns,
for INSERT and UPDATE statements.

There is no way to mark a column as auto-increment and also explicitly provide values for it.

If you need this behaviour, consider `myTable.setPrimaryKey().addHasExplicitDefaultValue()`