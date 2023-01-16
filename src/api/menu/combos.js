var mysql = require('mysql');
sql1 = "";
con.connect(executeQuery(err,sql1));

function executeQuery (err,sql){
  if (err) throw err;
  console.log("DB connected");
  con.query(sql,function(err, result,fields){
    if (err) throw err;
    console.log(result);
  });
};

