SELECT
  IF(
    COALESCE(
      (
        SELECT
          `table`.`b`
        FROM
          `table`
        LIMIT
          1
      ), false
    ), 45, 999
  ) AS `__aliased--value`