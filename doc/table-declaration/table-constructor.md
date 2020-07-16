### Table constructor

To declare a table,

```ts
import * as sql from "typed-orm";

/**
 * `"myTable"` is the alias of the table in our schema.
 */
const myTable = tsql.table("myTable");
```

A `typed-orm` table is an immutable data structure.

A method that appears to modify properties of the table actually returns a new table instance, and does not modify the original table instance.

-----

We have a table now, but a table without columns is not very useful.

-----

We should [add columns](add-columns.md) to the table, next.