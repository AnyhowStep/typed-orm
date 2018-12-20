SELECT
  (
    CASE
      `table`.`x`
      WHEN 67 THEN COALESCE(
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