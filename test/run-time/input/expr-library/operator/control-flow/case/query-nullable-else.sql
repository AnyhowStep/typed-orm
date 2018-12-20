SELECT
  (
    CASE
      `table`.`x`
      WHEN 67 THEN 99999
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