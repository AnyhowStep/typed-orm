SELECT
  (
    CASE
      `table`.`x`
      WHEN 67 THEN 99999
      ELSE COALESCE(
        (
          SELECT
            `table`.`x`
          FROM
            `table`
          LIMIT
            1
        ), 89
      )
    END
  ) AS `__aliased--value`