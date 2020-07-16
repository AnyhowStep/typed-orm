### Declaring default values

Most columns do not have default values.

When performing an INSERT, we must provide values for all columns that do not have default values.

However, if a column has a default value,
then we can let the database use it for INSERTs.

-----

### Nullable columns

Nullable columns have an implicit default value of `NULL`.

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const myTable = sql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntSigned(),
        title : tm.mysql.varChar(255),
        //Implicit default value of `NULL`
        createdAt : tm.mysql.dateTime(3).orNull(),
    })
    .setAutoIncrement(columns => columns.myTableId);
```

-----

### `.addHasExplicitDefaultValue()`

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const myTable = sql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntSigned(),
        title : tm.mysql.varChar(255),
        createdAt : tm.mysql.dateTime(3),
    })
    .setAutoIncrement(columns => columns.myTableId)
    .addHasExplicitDefaultValue(columns => [
        columns.createdAt
    ]);
```
