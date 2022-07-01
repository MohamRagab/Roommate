const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const users = async function (req, res) {
  const statement = `BEGIN USERS_BUSINESS_RULES_PKG.GET_USERS(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
  const bindVars = {
    cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    STATUS_CODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    STATUS_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },
  };
  let DataRes = await executeOperationsDB2(statement, bindVars);


  // return DataRes;
  if (DataRes.StatusCode == 0) {
    return res.status(500).send(DataRes);
  } else {
    return res.status(200).send(DataRes);
  }
}


const usersByKey = async function (req, res) {
  let Email = req.params.Email
  const statement = `BEGIN USERS_BUSINESS_RULES_PKG.GET_USERS_BY_ID(:EMAIL,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
  const bindVars = {
    EMAIL: Email,
    cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    STATUS_CODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    STATUS_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },
  };
  let DataRes = await executeOperationsDB2(statement, bindVars);
  // return DataRes;
  if (DataRes.StatusCode == 0) {
    return res.status(500).send(DataRes);
  } else {
    return res.status(200).send(DataRes);
  }
}

const registeration = async function (req, res) {
  const {
    Email,
    Password,
    FullName
  } = req.body
  const statement = `BEGIN USERS_BUSINESS_RULES_PKG.INSERT_USERS(:EMAIL ,:PASSWORD , :FULL_NAME,:STATUS_CODE,:STATUS_MESSAGE); END;`;
  const bindVars = {
    EMAIL: Email,
    PASSWORD: await bcrypt.hash(Password, 10),
    FULL_NAME: FullName,
    STATUS_CODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    STATUS_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },

  };
  let DataRes = await executeOperationsDB2(statement, bindVars, 'trs');
  if (DataRes.StatusCode == 0) {
    res.status(500).send(DataRes);
  } else {
    res.status(200).send(DataRes);

  }
}

const updateUsers = async function (req, res) {
  console.log("UserId =" + req.query.UserId)
  const {
    Email,
    Password,
    FullName
  } = req.body
  const statement = `BEGIN USERS_BUSINESS_RULES_PKG.UPDATE_USERS(:P_EMAIL ,:P_PASSWORD ,:P_USER_ID, :P_FULL_NAME,:STATUS_CODE,:STATUS_MESSAGE); END;`;
  const bindVars = {
    P_EMAIL: Email,
    P_PASSWORD: await bcrypt.hash(Password, 10),
    P_USER_ID: req.query.UserId,
    P_FULL_NAME: FullName,
    STATUS_CODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    STATUS_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },

  };
  let DataRes = await executeOperationsDB2(statement, bindVars, 'trs');
  if (DataRes.StatusCode == 0) {
    return res.status(500).send(DataRes);
  } else {
    return res.status(200).send(DataRes);

  }
}


const deleteUsers = async function (req, res) {

  const statement = `BEGIN USERS_BUSINESS_RULES_PKG.DELETE_USERS(:P_USER_ID,:STATUS_CODE,:STATUS_MESSAGE); END;`;
  const bindVars = {
    P_USER_ID: req.query.UserId,
    STATUS_CODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    STATUS_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },

  };
  let DataRes = await executeOperationsDB2(statement, bindVars, 'trs');
  if (DataRes.StatusCode == 0) {
    res.status(500).send(DataRes);
  } else {
    res.status(200).send(DataRes);

  }
}
module.exports = [users, registeration, updateUsers, deleteUsers, usersByKey]