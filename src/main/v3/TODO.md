+ Investigate row constructor support

  https://dev.mysql.com/doc/refman/5.7/en/row-constructor-optimization.html
  https://dev.mysql.com/doc/refman/5.7/en/row-subqueries.html

+ Implement temporary table support.
  Contrived example below,
  ```ts
  o.from(temporaryTable)
    .select((c, q) => [
      c.value,
      q.subQuery()
        //Executing this will result in
        //ER_CANT_REOPEN_TABLE: Can't reopen table.
        //You cannot refer to a TEMPORARY table more than once
        //in the same query.
        .from(temporaryTable.as("inner"))
        .where(c => o.eq(
          c.temporaryTable.key,
          c.inner.key
        ))
        .selectExpr(c => o.add(c.inner.value, 34))
        .limit(1)
        .as("add-34")
    ])
    .execute(connection);
  ```

+ Implement replaceTable()

+ INSERT statements
  + ON DUPLICATE KEY UPDATE
+ DELETE statements
  + Polymorphic delete
  + Aliasing a table currently makes it ineligible for deletes
    TODO: Fix it?
    Aliasing a table shouldn't erase the fact it can be deleted from?
+ CTE

+ Validate table declarations
+ Log table pattern
+ START TRANSACTION READ ONLY

+ String collation safety
  + _utf8'some string' COLLATE utf8_danish_ci

+ BigInt range safety
  + Not going over 2^64-1 for UNSIGNED BIGINT
  + Range safety for TINYINT, SMALLINT, MEDIUMINT, INT

+ DECIMAL support
+ SET support
+ ENUM support
+ BIT support