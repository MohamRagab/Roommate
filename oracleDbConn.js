const oracledb = require('oracledb');
oracledb.autoCommit = true;
let generalError = "";
async function executeOperationsDB(st , stArg ,stType) {


  try {
    connection = await oracledb.getConnection({
      user: "roommate",
      password: '123',
      connectString: "localhost:1521/xe"
    });
    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(st,stArg ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
    // console.log("---**--- "+JSON.stringify(result))
       
    if (stType ==='get' && result.rows.length == 0) {
      //query return zero employees
      // return 'query send no rows';
      return  JSON.stringify(result.rows);
    } else {
      //send all employees
      // let data = JSON.parse(result.rows);
      return  JSON.stringify(result.rows);  
    }

   
   
  
  } catch (err) {
    console.log("send error message")
    generalError=err.message;
    return JSON.stringify([{"status" : 0 , "message" : err.message }]);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    

  }
}

module.exports = executeOperationsDB