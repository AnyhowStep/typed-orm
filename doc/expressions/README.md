### Expressions

This library does not have many expressions/functions/operators from MySQL built-in.

However, you can create your own [custom expressions](custom-expressions.md)

-----

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
  + `nullSafeNotEq(expr, expr)`*

    Internally, `NOT (a <=> b)`

+ Control-flow
  + [`if(boolean, expr, expr)`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_if)
  + [`case()`/`case(expr)`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#operator_case)

+ Date-time
  + [`timestampAdd(TemporalUnit, bigint, Date)`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_timestampadd)
  + [`timestampDiff(TemporalUnit, Date, Date)`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_timestampdiff)
  + [`utcTimestamp(0|1|2|3)`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_utc-timestamp)

+ Information
  + [`database()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database)
  + [`foundRows()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_found-rows)

+ Math
  + [`ceil(number)`](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_ceil)
  + [`floor(number)`](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_floor)
  + [`rand()`/`rand(bigint)`](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_rand)
  + [`round(number)`](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_round)

+ String
  + [`ascii(string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_ascii)
  + [`bin(bigint|number`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_bin)
  + [`bitLength(string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_bit-length)
  + [`char(number, ...)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_char)
  + [`charLength(string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_char-length)
  + [`concat(string, ...)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat)
  + [`concatWs(string, string|null, ...)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat-ws)
  + [`elt(number, string, ...)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_elt)
  + [`exportSet(number, string, string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_export-set)
  + [`field(string, string, ...)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_field)
  + [`findInSet(string, string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_find-in-set)
  + [`format(number, number)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_format)
  + [`fromBase64(string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_from-base64)
  + [`hex(bigint|number|string)`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_hex)

+ Subquery
  + [`exists(query)`](https://dev.mysql.com/doc/refman/8.0/en/exists-and-not-exists-subqueries.html)

+ Arithmetic
  + [`add(number, ...)`/`bigIntAdd(bigint, ...)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus)
  + `addAsDecimal({ maxDigitCount, fractionalDigitCount }, number, ...)`*

    Like `add(number, ...)` but casts to `DECIMAL`, performs addition, then casts to `DOUBLE`

  + [`div(number, number)`/`bigIntDiv(bigint, bigint)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_divide)
  + [`integerDiv(bigint, bigint)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_div)
  + [`mod(number, number)`,`bigIntMod(bigint, bigint)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_mod)
  + [`mul(number, ...)`/`bigIntMul(bigint, ...)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times)
  + [`neg(number)`/`bigIntNeg(bigint)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_unary-minus)
  + [`sub(number, ...)`/`bigIntSub(bigint, ...)`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus)

+ Logical
  + [`and(boolean, ...)`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and)
  + `isNotNullAnd(expr, (expr) => boolean)`*

    Equivalent to `(expr IS NOT NULL) AND (boolean)`.
    
    This function narrows the type of `expr` from `T|null` to `T`.

  + [`not(boolean)`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_not)
  + [`or(boolean, ...)`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or)
  + [`xor(boolean, boolean)`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_xor)
