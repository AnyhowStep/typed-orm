SELECT
  (
    CASE
      WHEN `table`.`b` THEN COALESCE(
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