const oracledb = require('oracledb');
// hr schema password
var password = '<PASSWORD>' 
// checkConnection asycn function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "hr",
        password: "hr",
        connectString: "localhost:1521/cd_db"
    });
    console.log('connected to database');
    result = await connection.execute(`SELECT * FROM employees where rownum < 5` , [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
    // const js4 = JSON.parse(result.rows);
   console.log(result.rows);
  } catch (err) {
    console.error(err.message);
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

checkConnection();