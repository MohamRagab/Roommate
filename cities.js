const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const cities = async function (req, res) {
    const statement = `BEGIN CITIES_BUSINESS_RULES_PKG.GET_CITIES(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const citiesByKey = async function (req, res) {
    let CityCodePk = req.params.CityCodePk
    const statement = `BEGIN CITIES_BUSINESS_RULES_PKG.GET_CITIES_BY_ID(:P_CITY_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_CITY_CODE_PK: CityCodePk,
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

const insertCities = async function (req, res) {
    const {
        CityNameEn,
        CityNameAr
    } = req.body
    const statement = `BEGIN CITIES_BUSINESS_RULES_PKG.INSERT_CITIES(
         :P_CITY_NAME_EN ,
         :P_CITY_NAME_AR ,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_CITY_NAME_EN: CityNameEn,
        P_CITY_NAME_AR: CityNameAr,
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

const updateCities = async function (req, res) {
    console.log("CityCodePk =" + req.query.CityCodePk)
    const {
        CityNameEn,
        CityNameAr
    } = req.body
    const statement = `BEGIN CITIES_BUSINESS_RULES_PKG.UPDATE_CITIES(
        :P_CITY_CODE_PK ,
        :P_CITY_NAME_EN ,
        :P_CITY_NAME_AR ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_CITY_CODE_PK: req.query.CityCodePk,
        P_CITY_NAME_EN: CityNameEn,
        P_CITY_NAME_AR: CityNameAr,
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


const deleteCities = async function (req, res) {

    const statement = `BEGIN CITIES_BUSINESS_RULES_PKG.DELETE_CITIES(:P_CITY_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_CITY_CODE_PK: req.query.CityCodePk,
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
module.exports = [cities, citiesByKey, insertCities, updateCities, deleteCities]