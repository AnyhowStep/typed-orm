`table`
INNER JOIN
  `joined1`
ON
  `joined1`.`y` = `table`.`y` AND
  `joined1`.`y` = `table`.`y`
INNER JOIN
  `joined2`
ON
  `joined2`.`x` = `table`.`x` AND
  `joined2`.`b` = `joined1`.`b`