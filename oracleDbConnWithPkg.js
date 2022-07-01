const { parse } = require("dotenv");
const oracledb = require("oracledb");
oracledb.autoCommit = true;
let generalError = "";
async function executeOperationsDB2(statement, ars, type) {
  let Data = {};
  connection = null;
  try {
    connection = await oracledb.getConnection({
      user: "roommate",
      password: "123",
      connectString: "localhost:1521/xe",
    });



    // const bindVars = {
    //     EMAIL:  'EMAIL',
    //     PASSWORD:  'PASSWORD',
    //     USER_ID:  'USER_ID22',
    //     FULL_NAME:  'FULL_NAME', // default direction is BIND_IN. Data type is inferred from the data
    //     STATUS_CODE:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    //     STATUS_MESSAGE:  { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },
    //   };

    //   const result = await connection.execute(
    //     `BEGIN USERS_BUSINESS_RULES_PKG.INSERT_USERS(:EMAIL, :PASSWORD, :USER_ID,:FULL_NAME,:STATUS_CODE,:STATUS_MESSAGE); END;`,
    //     bindVars
    //   );

    // const bindVars = {
    //     cursor: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR},
    //     STATUS_CODE:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    //     STATUS_MESSAGE:  { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },
    // mData: { extendedMetaData: true }

    //   };
    const tun = {
      prefetchRows: 1000, // tune the internal getRow() data fetch performance
      fetchArraySize: 1000,
    };

    //   const mData = { extendedMetaData: true };
    const result = await connection.execute(
      statement,
      ars,
      // `BEGIN USERS_BUSINESS_RULES_PKG.GET_USERS(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`,
      // bindVars
      tun
    );
    const [StatusCode, StatusMessage] = [
      result.outBinds.STATUS_CODE,
      result.outBinds.STATUS_MESSAGE,
    ];
    //  console.log("StatusCode = " +StatusMessage)
    if (type == "trs") {
      Data = { StatusCode, StatusMessage };
      return Data;
    }

    const resultSet = result.outBinds.cursor;
    let metaDataCol = JSON.parse(JSON.stringify(await resultSet.metaData));
    let columns = [];

    let ResponseData = [];

    let d = 0;
    metaDataCol.forEach(function (element) {
      const col = element.name
        .toLowerCase()
        .split("_")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join("");
      columns.push(col);
    });
    while ((row = await resultSet.getRow())) {
      let result = row.reduce(function (result, field, index) {
        result[columns[index]] = field;
        return result;
      }, {});
      ResponseData[d] = result;
      d++;
    }
    await resultSet.close();
    Data = { StatusCode, StatusMessage, ResponseData: ResponseData };
    return Data;
  } catch (err) {
    //   console.log(err)
    const [StatusCode, StatusMessage] = [0, err.message];
    Data = { StatusCode, StatusMessage, ResponseData: [] };
    return Data;
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        // console.error(err.message);
        const [StatusCode, StatusMessage] = [0, err.message];
        Data = { StatusCode, StatusMessage, ResponseData: [] };
        return Data;
      }
    }
  }
}

module.exports =
  executeOperationsDB2;
