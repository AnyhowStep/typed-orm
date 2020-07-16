### Renaming the Table

`.setAlias()` changes the alias of the table.

Completely different from `.as()`, which aliases a table for a query.

-----

This method is generally used when you have multiple tables with a similar structure,

```ts
import * as sql from "typed-orm";
import * as tm from "type-mapping/fluent";

/**
 * Recall that `table` instances are immutable.
 *
 * Subsequent method calls all return a new table instance
 * and leave the old table instance untouched.
 */
const enumBase = sql.table("enumBase")
    .addColumns({
        title : tm.mysql.varChar(255),
        description : tm.mysql.varChar(2048),
    });

/**
 * Table `musicGenre` has columns,
 * + `musicGenreId`
 * + `title`
 * + `description`
 */
const musicGenre = enumBase
    .setTableAlias("musicGenre")
    .addColumns({
        musicGenreId : tm.mysql.bigIntSigned(),
    })
    .setAutoIncrement(c => c.musicGenreId);

/**
 * Table `instrument` has columns,
 * + `instrumentId`
 * + `title`
 * + `description`
 */
const instrument = enumBase
    .setTableAlias("instrument")
    .addColumns({
        instrumentId : tm.mysql.bigIntSigned(),
    })
    .setAutoIncrement(c => c.instrumentId);
```