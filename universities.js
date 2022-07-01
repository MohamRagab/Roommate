const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const universities = async function (req, res) {
    const statement = `BEGIN UNIVERSITIES_BUSINESS_RULES_PKG.GET_UNIVERSITIES(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const universitiesByKey = async function (req, res) {
    let UniversityCodePk = req.params.UniversityCodePk
    const statement = `BEGIN UNIVERSITIES_BUSINESS_RULES_PKG.GET_UNIVERSITIES_BY_ID(:P_UNIVERSITY_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_UNIVERSITY_CODE_PK: UniversityCodePk,
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

const insertUniversities = async function (req, res) {
    const {
        UniversityNameEn,
        UniversityNameAr
    } = req.body
    const statement = `BEGIN UNIVERSITIES_BUSINESS_RULES_PKG.INSERT_UNIVERSITIES(
         :P_UNIVERSITY_NAME_EN ,
         :P_UNIVERSITY_NAME_AR ,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_UNIVERSITY_NAME_EN: UniversityNameEn,
        P_UNIVERSITY_NAME_AR: UniversityNameAr,
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

const updateUniversities = async function (req, res) {
    console.log("UniversityCodePk =" + req.query.UniversityCodePk)
    const {
        UniversityNameEn,
        UniversityNameAr
    } = req.body
    const statement = `BEGIN UNIVERSITIES_BUSINESS_RULES_PKG.UPDATE_UNIVERSITIES(
        :P_UNIVERSITY_CODE_PK ,
        :P_UNIVERSITY_NAME_EN ,
        :P_UNIVERSITY_NAME_AR ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_UNIVERSITY_CODE_PK: req.query.UniversityCodePk,
        P_UNIVERSITY_NAME_EN: UniversityNameEn,
        P_UNIVERSITY_NAME_AR: UniversityNameAr,
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


const deleteUniversities = async function (req, res) {

    const statement = `BEGIN UNIVERSITIES_BUSINESS_RULES_PKG.DELETE_UNIVERSITIES(:P_UNIVERSITY_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_UNIVERSITY_CODE_PK: req.query.UniversityCodePk,
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
module.exports = [universities, universitiesByKey, insertUniversities, updateUniversities, deleteUniversities]