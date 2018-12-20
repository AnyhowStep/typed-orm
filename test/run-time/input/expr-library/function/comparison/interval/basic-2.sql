SELECT
  INTERVAL(
    `table`.`x`,
    `table`.`z`,
    43,
    COALESCE(
      (
        SELECT
          `table`.`x`
        FROM
          `table`
        LIMIT
          1
      ), 9999
    )
  ) AS `__aliased--value`