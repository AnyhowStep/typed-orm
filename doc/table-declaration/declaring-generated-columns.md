### Declaring generated columns

When performing an INSERT/UPDATE, we **cannot** provide values for generated columns.

The value of generated columns is always set by the database.

-----

### `.addGenerated()`

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const triangle = sql.table("triangle")
    .addColumns({
        a : tm.mysql.double(),
        b : tm.mysql.double(),
        /**
         * hypSquared DOUBLE NOT NULL AS (
         *     a*a + b*b
         * )
         */
        hypSquared : tm.mysql.double(),
    })
    .addGenerated(columns => [columns.hypSquared]);
```
