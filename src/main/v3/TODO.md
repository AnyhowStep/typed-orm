+ Investigate row constructor support

  https://dev.mysql.com/doc/refman/5.7/en/row-constructor-optimization.html
  https://dev.mysql.com/doc/refman/5.7/en/row-subqueries.html

+ Implement subqueries.

+ Implement replaceTable()

+ Implement type-narrowing `WHERE` expressions
  + andWhereIsNull
  + andWhereIsNotNull
  + andWhereIsEqual
+ Implement `Query.useJoins()`

+ Implement `Column.asc()/.desc()`, `Expr.asc()/.desc()` convenience methods

+ UTC Offset support (If you store your times as EDT/EST, good luck?)