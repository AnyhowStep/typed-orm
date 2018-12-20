SELECT
  (
    CASE
      WHEN false THEN 99999
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