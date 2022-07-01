const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const membersTypes = async function (req, res) {
    const statement = `BEGIN MEMBERS_TYPES_BUSINESS_RULES_PKG.GET_MEMBERS_TYPES(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const membersTypesByKey = async function (req, res) {
    let MemberTypePk = req.params.MemberTypePk
    const statement = `BEGIN MEMBERS_TYPES_BUSINESS_RULES_PKG.GET_MEMBERS_TYPES_BY_ID(:P_MEMBER_TYPE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_TYPE_PK: MemberTypePk,
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

const insertMembersTypes = async function (req, res) {
    const {
        MemberTypeNameEn,
        MemberTypeNameAr
    } = req.body
    const statement = `BEGIN MEMBERS_TYPES_BUSINESS_RULES_PKG.INSERT_MEMBERS_TYPES(
         :P_MEMBER_TYPE_NAME_EN ,
         :P_MEMBER_TYPE_NAME_AR ,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_TYPE_NAME_EN: MemberTypeNameEn,
        P_MEMBER_TYPE_NAME_AR: MemberTypeNameAr,
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

const updateMembersTypes = async function (req, res) {
    console.log("MemberTypePk =" + req.query.MemberTypePk)
    const {
        MemberTypeNameEn,
        MemberTypeNameAr
    } = req.body
    const statement = `BEGIN MEMBERS_TYPES_BUSINESS_RULES_PKG.UPDATE_MEMBERS_TYPES(
        :P_MEMBER_TYPE_PK,
        :P_MEMBER_TYPE_NAME_EN ,
        :P_MEMBER_TYPE_NAME_AR ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_TYPE_PK: req.query.MemberTypePk,
        P_MEMBER_TYPE_NAME_EN: MemberTypeNameEn,
        P_MEMBER_TYPE_NAME_AR: MemberTypeNameAr,
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


const deleteMembersTypes = async function (req, res) {

    const statement = `BEGIN MEMBERS_TYPES_BUSINESS_RULES_PKG.DELETE_MEMBERS_TYPES(:P_MEMBER_TYPE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_TYPE_PK: req.query.MemberTypePk,
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
module.exports = [membersTypes, membersTypesByKey, insertMembersTypes, updateMembersTypes, deleteMembersTypes]