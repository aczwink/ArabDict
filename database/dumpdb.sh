sudo mysqldump arabdict --no-data | sed 's/ AUTO_INCREMENT=[0-9]*\b//'  > db.sql
