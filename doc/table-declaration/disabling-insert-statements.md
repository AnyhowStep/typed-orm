### Disabling INSERT Statements

Prevents rows from being inserted to this table through this library.

Good for look-up tables.

-----

To disable `INSERT` statements for a table,

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const businessType = sql.table("businessType")
    .addColumns({
        businessTypeId : tm.mysql.bigIntSigned(),
        name : tm.mysql.varChar(255),
        description  :tm.mysql.varChar(2048),
    })
    /**
     * We do not want to add new rows to this look-up table
     */
    .disallowInsert();
```