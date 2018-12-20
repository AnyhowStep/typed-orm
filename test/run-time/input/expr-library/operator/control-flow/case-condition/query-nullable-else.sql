SELECT
  (
    CASE
      WHEN `table`.`b` THEN 99999
      ELSE (
        SELECT
          `table`.`x`
        FROM
          `table`
        LIMIT
          1
      )
    END
  ) AS `__aliased--value`