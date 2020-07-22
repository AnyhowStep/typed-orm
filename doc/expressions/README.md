Asterisks (*) denote expressions not natively from MySQL.

+ Aggregate
  + `avg(number|bigint|null)`
    https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_avg
  + `count()`
    https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count
  + MAX
  + MIN
  + SUM
  + SUM_AS_DECIMAL*
+ Cast
  + CAST( AS DATETIME)
  + CAST( AS DOUBLE)
  + CAST( AS SIGNED INTEGER)
  + CAST( AS UNSIGNED INTEGER)
+ Comparison
  + STR_CMP
  + COALESCE
  + GREATEST
  + INTERVAL
  + LEASE
  + LIKE
  + BETWEEN
  + COMPARISON
  + EQ
  + GT
  + GTEQ
  + IN
  + IS FALSE
  + IS NOT FALSE
  + IS NOT NULL
  + IS NOT TRUE
  + IS NULL
  + IS TRUE
  + LT
  + LTEQ
  + NOT BETWEEN
  + NOT EQ
  + NOT IN
  + NULL SAFE EQ
  + NULL SAFE NOT EQ
  + 
+ Control-flow
  + IF
  + CASE
+ Date-time
  + TIMESTAMP_ADD
  + TIMESTAMP_DIFF
  + UTC_TIMESTAMP
+ Information
  + DATABASE
  + FOUND_ROWS
+ Math
  + CEIL
  + FLOOR
  + RAND
  + ROUND
+ String
  + ASCII
  + BIN
  + BIT_LENGTH
  + CHAR
  + CHAR_LENGTH
  + CONCAT
  + CONCAT_WS
  + ELT
  + EXPORT_SET
  + FIELD
  + FIND_IN_SET
  + FORMAT
  + FROM_BASE64
  + HEX
+ Subquery
  + EXISTS
+ Arithmetic
  + ADD
  + ADD_AS_DECIMAL*
  + DIV
  + INTEGER_DIV
  + MOD
  + MUL
  + NEG
  + SUB
+ Logical
  + AND
  + IS NOT NULL AND
  + NOT
  + OR
  + XOR
+ Custom Functions