(
  COALESCE(
    (
      SELECT
        `table`.`str`
      FROM
        `table`
      LIMIT
        1
    ), ''
  ) LIKE '%llo%'
)