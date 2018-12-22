`table`
INNER JOIN
  (
    SELECT
      `joined1`.`c`
    FROM
      `joined1`
  ) AS `subQuery`
ON
  `subQuery`.`c` = `table`.`y`