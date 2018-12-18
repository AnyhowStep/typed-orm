UNION DISTINCT
  (
    SELECT
      (`table`.`y` = `table`.`b`) AS `__aliased--test`,
      `table`.`x` AS `table--x`,
      `table`.`y` AS `table--y`,
      `table`.`z` AS `table--z`
    FROM
      `table`
  )
UNION DISTINCT
  (
    SELECT
      `table`.`c` AS `table--c`,
      `table`.`a` AS `table--a`,
      `table`.`b` AS `table--b`,
      `table`.`c` AS `table--other`
    FROM
      `table`
  )
UNION DISTINCT
  (
    SELECT
      `table`.`c` AS `table--c`,
      `table`.`a` AS `table--a`,
      `table`.`b` AS `table--b`,
      `table`.`z` AS `table--z`
    FROM
      `table`
  )
UNION ALL
  (
    SELECT
      `table`.`c` AS `table--c`,
      `table`.`a` AS `table--a`,
      `table`.`b` AS `table--b`,
      (
        `table`.`c` AND
        `table`.`z`
      ) AS `__aliased--thing`
    FROM
      `table`
  )