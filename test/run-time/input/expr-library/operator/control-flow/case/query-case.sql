SELECT
  (
    CASE
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
      WHEN 45 THEN '45'
    END
  ) AS `__aliased--value`