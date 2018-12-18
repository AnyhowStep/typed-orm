SELECT
  (
    `table`.`z` AND
    `joined1`.`c`
  ) AS `__aliased--test`,
  `joined1`.`b` AS `joined1--b`,
  `joined1`.`c` AS `joined1--c`,
  `joined1`.`x` AS `joined1--x`,
  `table`.`x` AS `table--x`,
  `table`.`y` AS `table--y`,
  `table`.`z` AS `table--z`