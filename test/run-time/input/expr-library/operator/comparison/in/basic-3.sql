SELECT
  (
    `table`.`x` IN(
      `table`.`z`,
      COALESCE(
        (
          SELECT
            `table2`.`n`
          FROM
            `table2`
          LIMIT
            1
        ),(
          SELECT
            `table2`.`n`
          FROM
            `table2`
          LIMIT
            1
        ), 0
      )
    )
  ) AS `__aliased--value`