SELECT
  (
    (
      SELECT
        `table`.`x`
      FROM
        `table`
      LIMIT
        1
    ) IS NOT NULL
  ) AS `__aliased--value`