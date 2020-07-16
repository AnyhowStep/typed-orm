### Restricting UPDATE statements/Declaring mutable columns

This library makes all columns of a table immutable by default.

This means you cannot modify column values with UPDATE statements.

-----

You need to explicitly declare which columns are mutable.

-----

### `.setMutable()`

This method lets you specify which columns are mutable.
```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const myTable = sql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntSigned(),
        title : tm.mysql.varChar(255),
        content : tm.mysql.varChar(255),
    })
    .setAutoIncrement(columns => columns.myTableId)
    .setMutable(columns => [
        columns.title,
    ]);
```

Mutable columns may be modified with UPDATE statements.

-----

### `.setImmutable()`

You should not have to use this method often, if at all.

If you see this being used, it probably comes from a time when it was unsure if columns should be mutable or immutable by default.