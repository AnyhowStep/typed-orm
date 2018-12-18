UNION DISTINCT
  (
    SELECT
      `table`.`z` AS `table--z`,
      `table`.`x` AS `table--x`,
      `table`.`y` AS `table--y`
    FROM
      `table`
    UNION ALL
      (
        SELECT
          `table`.`c` AS `table--c`,
          `table`.`a` AS `table--a`,
          `table`.`b` AS `table--b`
        FROM
          `table`
      )
  )