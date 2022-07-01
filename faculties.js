const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const faculties = async function (req, res) {
    const statement = `BEGIN FACULTIES_BUSINESS_RULES_PKG.GET_FACULTIES(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const facultiesByKey = async function (req, res) {
    let FacultyCodePk = req.params.FacultyCodePk
    const statement = `BEGIN FACULTIES_BUSINESS_RULES_PKG.GET_FACULTIES_BY_ID(:P_FACULTY_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_FACULTY_CODE_PK: FacultyCodePk,
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

const insertfaculties = async function (req, res) {
    const {
        FacultyNameEn,
        FacultyNameAr,
        UniversityCodeFk

    } = req.body
    const statement = `BEGIN FACULTIES_BUSINESS_RULES_PKG.INSERT_FACULTIES(
         :P_FACULTY_NAME_EN ,
         :P_FACULTY_NAME_AR ,
         :P_UNIVERSITY_CODE_FK,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_FACULTY_NAME_EN: FacultyNameEn,
        P_FACULTY_NAME_AR: FacultyNameAr,
        P_UNIVERSITY_CODE_FK: UniversityCodeFk,
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

const updatefaculties = async function (req, res) {
    console.log("FacultyodePk =" + req.query.FacultyCodePk)
    const {
        FacultyNameEn,
        FacultyNameAr,
        UniversityCodeFk
    } = req.body
    const statement = `BEGIN FACULTIES_BUSINESS_RULES_PKG.UPDATE_FACULTIES(
        :P_FACULTY_CODE_PK ,
        :P_FACULTY_NAME_EN ,
        :P_FACULTY_NAME_AR ,
        :P_UNIVERSITY_CODE_FK,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_FACULTY_CODE_PK: req.query.FacultyCodePk,
        P_FACULTY_NAME_EN: FacultyNameEn,
        P_FACULTY_NAME_AR: FacultyNameAr,
        P_UNIVERSITY_CODE_FK: UniversityCodeFk,
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


const deletefaculties = async function (req, res) {

    const statement = `BEGIN FACULTIES_BUSINESS_RULES_PKG.DELETE_FACULTIES(:P_FACULTY_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_FACULTY_CODE_PK: req.query.FacultyCodePk,
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
module.exports = [faculties, facultiesByKey, insertfaculties, updatefaculties, deletefaculties]