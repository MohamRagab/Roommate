const { json } = require('express');
const express = require('express')
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
// const port = 5000;
const port = process.env.port || 4000;
var password = 'hr';
oracledb.autoCommit = true;




async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: 'hr',
      connectString: "localhost:1521/cd_db"
    });
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM employees where rownum < 6`,[] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
    
  
  } catch (err) {
    //send error message
    return res.send(err.message);
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
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      // let data = JSON.parse(result.rows);
      return res.send(result.rows);
    }

  }
}

//get /employess

app.get('/employees2', function (req, res) {
  selectAllEmployees(req, res);
})

async function selectEmployeesById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: password,
      connectString: "localhost:1521/cd_db"
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    // run query to get employee with employee_id
    result = await connection.execute(`SELECT * FROM employees where employee_id=:id`, [id] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employee?id=<id employee>
app.get('/employee', function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number')
    return
  }
  selectEmployeesById(req, res, id);
})



async function InsertDepartments(req, res ) {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: 'hr',
      connectString: "localhost:1521/cd_db"
    });
    //res.setHeader('Access-Control-Allow-Origin', '*');
    // deptData =  [904, "testDEptFromNode2" , , 1100];
    console.log("1111111111111111111111111111")
    console.log('Got body:', req.body);
    let Dt = req.body;
    console.log( "*******************" + Dt)
    // let deptData = [req.]
    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`insert into departments values (:DEPARTMENT_ID,:DEPARTMENT_NAME,:MANAGER_ID,:LOCATION_ID )`,[Dt.DeptId,Dt.DeptName,Dt.DeptMgr,Dt.LocId]);
    
  
  } catch (err) {
    //send error message
    return res.send(err.message);
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

      return res.send('Programming language created successfully');
    
    // if (result.rows.length == 0) {
    //   //query return zero employees
    //   return res.send('query send no rows');
    // } else {
    //   //send all employees
    //   // let data = JSON.parse(result.rows);
    //   return res.send(result.rows);
    // }

  }
}

  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.post('/InsertDepartments', function (req, res) {

  console.log('Got body1:', req.body);
  InsertDepartments(req, res);
})
app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))
