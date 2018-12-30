+ Investigate row constructor support

  https://dev.mysql.com/doc/refman/5.7/en/row-constructor-optimization.html
  https://dev.mysql.com/doc/refman/5.7/en/row-subqueries.html

+ Implement subqueries.

+ Implement replaceTable()

+ SELECT statements
  + fetchZeroOrOneByPk()
  + fetchZeroOrOneByCk()
  + fetchZeroOrOneBySk()
  + fetchOneByPk()
  + fetchOneByCk()
  + fetchOneBySk()
  + fetchValueOrUndefinedByPk()
  + fetchValueOrUndefinedByCk()
  + fetchValueOrUndefinedBySk()
  + fetchValueByPk()
  + fetchValueByCk()
  + fetchValueBySk()
  + existsByPk()
  + existsByCk()
  + existsBySk()
  + assertExistsByPk()
  + assertExistsByCk()
  + assertExistsBySk()
+ INSERT statements
  + ON DUPLICATE KEY UPDATE
  + insertAndFetch()
+ UPDATE statements
  + updateZeroOrOneByPk()
  + updateZeroOrOneByCk()
  + updateZeroOrOneBySk()
  + updateOnePk()
  + updateOneCk()
  + updateOneSk()
  + updateAndFetchZeroOrOneByPk()
  + updateAndFetchZeroOrOneByCk()
  + updateAndFetchZeroOrOneBySk()
  + updateAndFetchOneByPk()
  + updateAndFetchOneByCk()
  + updateAndFetchOneBySk()
+ DELETE statements
  + deleteZeroOrOneByPk()
  + deleteZeroOrOneByCk()
  + deleteZeroOrOneBySk()
  + deleteOneByPk()
  + deleteOneByCk()
  + deleteOneBySk()
  + Polymorphic delete
  + Aliasing a table currently makes it ineligible for deletes
    TODO: Fix it?
    Alising a table shouldn't erase the fact it can be deleted from?
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