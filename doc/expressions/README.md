Asterisks (*) denote expressions not natively from MySQL.

+ Aggregate
  + [`avg(number|bigint|null)`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_avg)
  + [`count()`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_count)
  + [`max(expr)`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_max)
  + [`min(expr)`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_min)
  + [`(number|null)`/`bigIntSum(bigint|null)`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_sum)
  + [`sumAsDecimal(number|null, { maxDigitCount, fractionalDigitCount })`*](sum-as-decimal.md)

+ Cast
  + [`castAsDateTime(Date|string, 0|1|2|3)`](https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast)
  + `castAsDouble(bigint)*`

    MySQL 5.7 does not have `CAST(x AS DOUBLE)`.
    However, `(x + 0e0)` has the same effect.

  + [`castAsSignedInteger(number|bigint)`](https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast)
  + [`castAsUnsignedInteger(number|bigint)`](https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast)

+ Comparison
  + [`strCmp(string, string)`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#function_strcmp)
  + [`coalesce(expr, ...)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_coalesce)
  + [`greatest(expr, expr, ...)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_greatest)
  + [`interval(number|bigint, number|bigint, ...)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_interval)
  + [`least(expr, expr, ...)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_least)
  + [`like(string, string)`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like)
  + [`between(expr, expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_between)
  + [`eq(expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal)
  + [`gt(expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_greater-than)
  + [`gtEq(expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_greater-than-or-equal)
  + [`in(expr, ...)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in)
  + [`isFalse(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is)
  + [`isNotFalse(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-not)
  + [`isNotNull(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-not-null)
  + [`isNotTrue(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-not)
  + [`isNull(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-null)
  + [`isTrue(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is)
  + [`lt(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than)
  + [`ltEq(expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than-or-equal)
  + [`notBetween(expr, expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_not-between)
  + [`notEq(expr, expr)` (in MySQL, both `<>` and `!=` are valid)](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_not-equal)
  + [`notIn(expr, ...)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in)
  + [`nullSafeEq(expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal-to)
  + [`nullSafeNotEq(expr, expr)`*]

    Internally, `NOT (a <=> b)`

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