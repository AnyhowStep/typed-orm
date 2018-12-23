SELECT
  (
    SELECT
      `table`.`x`
    FROM
      `table`
    LIMIT
      1
  ) AS `__aliased--test`