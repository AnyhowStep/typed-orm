SELECT
  IF(
    true,
    999,
    COALESCE(
      (
        SELECT
          `table`.`x`
        FROM
          `table`
        LIMIT
          1
      ), 89
    )
  ) AS `__aliased--value`