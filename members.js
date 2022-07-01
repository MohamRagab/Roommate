const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const members = async function (req, res) {
    let key = req.query.UserId
    const statement = `BEGIN MEMBERS_BUSINESS_RULES_PKG.GET_MEMBERS(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const membersByKey = async function (req, res) {
    let MemberCodePk = req.params.MemberCodePk
    const statement = `BEGIN MEMBERS_BUSINESS_RULES_PKG.GET_MEMBERS_BY_ID(:MEMBER_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        MEMBER_CODE_PK: MemberCodePk,
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

const insertMember = async function (req, res) {
    const {
        MemberTypeFk,
        MemberNameEn,
        MemberNameAr,
        MemberMobileNo,
        MemberAge,
        MemberBirthDate,
        MemberGroupFk,
        MemberUniversityFk,
        MemberFacultyFk,
        MemberPrefCode,
        UserIdFk,
        DocCodeFk,
        CityCodeFk
    } = req.body
    const statement = `BEGIN MEMBERS_BUSINESS_RULES_PKG.INSERT_MEMBERS(
        :P_MEMBER_TYPE_FK      ,
        :P_MEMBER_NAME_EN   ,
        :P_MEMBER_NAME_AR  ,
        :P_MEMBER_MOBILE_NO      ,
        :P_MEMBER_AGE   ,
        :P_MEMBER_BIRTH_DATE  ,
        :P_MEMBER_GROUP_FK  ,
        :P_MEMBER_UNIVERSITY_FK      ,
        :P_MEMBER_FACULTY_FK   ,
        :P_MEMBER_PREF_CODE  ,
        :P_USER_ID_FK      ,
        :P_DOC_CODE_FK   ,
        :P_CITY_CODE_FK ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_TYPE_FK: MemberTypeFk,
        P_MEMBER_NAME_EN: MemberNameEn,
        P_MEMBER_NAME_AR: MemberNameAr,
        P_MEMBER_MOBILE_NO: MemberMobileNo,
        P_MEMBER_AGE: MemberAge,
        P_MEMBER_BIRTH_DATE: MemberBirthDate,
        P_MEMBER_GROUP_FK: MemberGroupFk,
        P_MEMBER_UNIVERSITY_FK: MemberUniversityFk,
        P_MEMBER_FACULTY_FK: MemberFacultyFk,
        P_MEMBER_PREF_CODE: MemberPrefCode,
        P_USER_ID_FK: UserIdFk,
        P_DOC_CODE_FK: DocCodeFk,
        P_CITY_CODE_FK: CityCodeFk,
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

const updateMember = async function (req, res) {
    console.log("MemberCodePk =" + req.query.MemberCodePk)
    const {
        MemberTypeFk,
        MemberNameEn,
        MemberNameAr,
        MemberMobileNo,
        MemberAge,
        MemberBirthDate,
        MemberGroupFk,
        MemberUniversityFk,
        MemberFacultyFk,
        MemberPrefCode,
        UserIdFk,
        DocCodeFk,
        CityCodeFk
    } = req.body
    const statement = `BEGIN MEMBERS_BUSINESS_RULES_PKG.UPDATE_MEMBERS(
        :P_MEMBER_CODE_PK ,
        :P_MEMBER_TYPE_FK      ,
        :P_MEMBER_NAME_EN   ,
        :P_MEMBER_NAME_AR  ,
        :P_MEMBER_MOBILE_NO      ,
        :P_MEMBER_AGE   ,
        :P_MEMBER_BIRTH_DATE  ,
        :P_MEMBER_GROUP_FK  ,
        :P_MEMBER_UNIVERSITY_FK      ,
        :P_MEMBER_FACULTY_FK   ,
        :P_MEMBER_PREF_CODE  ,
        :P_USER_ID_FK      ,
        :P_DOC_CODE_FK   ,
        :P_CITY_CODE_FK ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_CODE_PK: req.query.MemberCodePk,
        P_MEMBER_TYPE_FK: MemberTypeFk,
        P_MEMBER_NAME_EN: MemberNameEn,
        P_MEMBER_NAME_AR: MemberNameAr,
        P_MEMBER_MOBILE_NO: MemberMobileNo,
        P_MEMBER_AGE: MemberAge,
        P_MEMBER_BIRTH_DATE: MemberBirthDate,
        P_MEMBER_GROUP_FK: MemberGroupFk,
        P_MEMBER_UNIVERSITY_FK: MemberUniversityFk,
        P_MEMBER_FACULTY_FK: MemberFacultyFk,
        P_MEMBER_PREF_CODE: MemberPrefCode,
        P_USER_ID_FK: UserIdFk,
        P_DOC_CODE_FK: DocCodeFk,
        P_CITY_CODE_FK: CityCodeFk,
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


const deleteMembers = async function (req, res) {

    const statement = `BEGIN MEMBERS_BUSINESS_RULES_PKG.DELETE_MEMBERS(:P_MEMBER_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_CODE_PK: req.query.MemberCodePk,
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
module.exports = [members, membersByKey, insertMember, updateMember, deleteMembers]