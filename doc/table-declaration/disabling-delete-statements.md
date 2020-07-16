### Disabling DELETE Statements

Prevents rows of this table from being deleted through this library.

Good for look-up tables, or append-only tables.

-----

To disable `DELETE` statements for a table,

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const temperatureSensorData = sql.table("temperatureSensorData")
    .addColumns({
        sensorId : tm.mysql.bigIntSigned(),
        loggedAt : tm.mysql.dateTime(3),
        degreesCelsius : tm.mysql.double(),
    })
    /**
     * We do not want to delete sensor data
     */
    .disallowDelete();
```