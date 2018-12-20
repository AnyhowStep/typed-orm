SELECT
  IF(
    true,
    COALESCE(
      (
        SELECT
          `table`.`x`
        FROM
          `table`
        LIMIT
          1
      ), 89
    ), 999
  ) AS `__aliased--value`