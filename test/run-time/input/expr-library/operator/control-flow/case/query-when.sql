SELECT
  (
    CASE
      `table`.`x`
      WHEN COALESCE(
        (
          SELECT
            `table`.`x`
          FROM
            `table`
          LIMIT
            1
        ), 89
      ) THEN '45'
    END
  ) AS `__aliased--value`