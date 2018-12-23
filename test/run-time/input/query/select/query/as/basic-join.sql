SELECT
  `test`.`x` AS `test--x`
FROM
  (
    SELECT
      `table`.`x`
    FROM
      `table`
    LIMIT
      1
  ) AS `test`