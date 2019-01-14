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
  + Aliasing a table currently makes it ineligible for deletes
    TODO: Fix it?
    Aliasing a table shouldn't erase the fact it can be deleted from?
+ CTE

+ START TRANSACTION READ ONLY

+ SELECT clause must be before adding map delegates, too
+ Derived tables cannot have `_parentJoins`

+ String collation safety
  + _utf8'some string' COLLATE utf8_danish_ci

+ DECIMAL support
+ SET support
+ ENUM support
+ BIT support

+ Multi-database support?

-----

Better table inheritance support,

+ Concrete vs. Abstract (Can the base table be instantiated?)
+ Exclusive vs. Inclusive (Can a base table row be multiple derived types?)

-----

Table-per-type support,

+ Exclusive and inclusive

-----

+ Better README?
+ More examples?
+ Documentation?

+ Polymorphic log tables?