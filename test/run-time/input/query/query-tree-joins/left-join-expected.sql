`table`
INNER JOIN
  `joined1`
ON
  `joined1`.`c` = `table`.`y`
LEFT JOIN
  `joined2`
ON
  `joined2`.`l` = `table`.`y` AND
  `joined2`.`j` = `joined1`.`a`