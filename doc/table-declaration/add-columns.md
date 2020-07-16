### `.addColumns()`

We use the `.addColumns()` method to add columns to the table.

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntSigned(),
        title : tm.mysql.varChar(255),
        createdAt : tm.mysql.dateTime(3),
    });
```

-----

We need to specify the column alias, and data type of each column.

-----

Now that the table has a few columns, we can now start writing queries with it.

However, this table declaration is far from being useful. We can add more to the table declaration.

For example, [declaring the primary key](declaring-the-primary-key.md) of the table.