sudo mysqldump arabdict --routines --no-data | sed -e 's/DEFINER=.* FUNCTION/FUNCTION/' | sed 's/ AUTO_INCREMENT=[0-9]*\b//'  > db.sql
