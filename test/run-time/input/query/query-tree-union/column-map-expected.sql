UNION DISTINCT
  (
    SELECT
      `table`.`a` AS `table--a`,
      `table`.`b` AS `table--b`,
      `table`.`c` AS `table--c`,
      `table`.`x` AS `table--x`,
      `table`.`y` AS `table--y`,
      `table`.`z` AS `table--z`
    FROM
      `table`
  )
UNION DISTINCT
  (
    SELECT
      `table2`.`a` AS `table2--a`,
      `table2`.`b` AS `table2--b`,
      `table2`.`c` AS `table2--c`,
      `table2`.`x` AS `table2--x`,
      `table2`.`y` AS `table2--y`,
      `table2`.`z` AS `table2--z`
    FROM
      `table2`
  )
UNION DISTINCT
  (
    SELECT
      `table`.`a` AS `table--a`,
      `table`.`b` AS `table--b`,
      `table`.`c` AS `table--c`,
      `table`.`x` AS `table--x`,
      `table`.`y` AS `table--y`,
      `table`.`z` AS `table--z`
    FROM
      `table`
  )
UNION ALL
  (
    SELECT
      `table2`.`a` AS `table2--a`,
      `table2`.`b` AS `table2--b`,
      `table2`.`c` AS `table2--c`,
      `table2`.`x` AS `table2--x`,
      `table2`.`y` AS `table2--y`,
      `table2`.`z` AS `table2--z`
    FROM
      `table2`
  )