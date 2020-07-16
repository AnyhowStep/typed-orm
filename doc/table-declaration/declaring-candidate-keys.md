### Declaring Candidate Keys

A candidate key is a minimal set of columns that uniquely identifies a row in a table.

In MySQL, a `UNIQUE KEY` roughly corresponds to the concept of a candidate key.

+ A table may have zero-to-many candidate keys. (recommended to have at least one, the PRIMARY KEY)
+ A candidate key cannot be a subset of other candidate keys.
+ A candidate key cannot be a superset of other candidate keys.
+ A candidate key can intersect other candidate keys.
+ A candidate key can be disjoint from other candidate keys.

-----

To add a candidate key,

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

const creditCardUsage = sql.table("creditCardUsage")
    .addColumns({
        creditCardUsageId : tm.mysql.bigIntSigned(),
        creditCardNumber : tm.mysql.varChar(255),
        /**
         * `DATETIME(3)` gives us millisecond precision.
         * The same precision as a JS `Date`.
         */
        usedAt : tm.mysql.dateTime(3),
        deltaAmount : tm.mysql.bigIntSigned(),
    })
    /**
     * This adds the candidate key `(creditCardNumber, usedAt)`
     * to the table `creditCardUsage`.
     *
     * The idea is that a credit card cannot be used
     * twice within the same millisecond.
     * (This isn't necessarily true but pretend it is true)
     */
    .addCandidateKey(columns => [
        columns.creditCardNumber,
        columns.usedAt,
    ]);
```