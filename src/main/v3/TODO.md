+ Investigate row constructor support

  https://dev.mysql.com/doc/refman/5.7/en/row-constructor-optimization.html
  https://dev.mysql.com/doc/refman/5.7/en/row-subqueries.html

+ Implement subqueries.

+ Implement replaceTable()

+ INSERT statements
  + Polymorphic Insert
  + ON DUPLICATE KEY UPDATE
+ UPDATE statements
+ DELETE statements

+ Validate table declarations
+ Log table pattern

+ String collation safety
  + _utf8'some string' COLLATE utf8_danish_ci

+ BigInt range safety
  + Not going over 2^64-1 for UNSIGNED BIGINT
  + Range safety for TINYINT, SMALLINT, MEDIUMINT, INT

+ DECIMAL support
+ SET support
+ ENUM support
+ BIT support