const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const membersGroups = async function (req, res) {
    const statement = `BEGIN MEMBERS_GROUPS_BUSINESS_RULES_PKG.GET_MEMBERS_GROUPS(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const membersGroupsByKey = async function (req, res) {
    let MemberGroupPk = req.params.MemberGroupPk
    const statement = `BEGIN MEMBERS_GROUPS_BUSINESS_RULES_PKG.GET_MEMBERS_GROUPS_BY_ID(:P_MEMBER_GROUP_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_GROUP_PK: MemberGroupPk,
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

const insertMembersGroups = async function (req, res) {
    const {
        MemberGroupNameEn,
        MemberGroupNameAr,
        OwnerUserIdFk,
        PreferenceCode
    } = req.body
    const statement = `BEGIN MEMBERS_GROUPS_BUSINESS_RULES_PKG.INSERT_MEMBERS_GROUPS(
         :P_MEMBER_GROUP_NAME_EN ,
         :P_MEMBER_GROUP_NAME_AR ,
         :P_OWNER_USER_ID_FK,
         :P_PREFERENCE_CODE,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_GROUP_NAME_EN: MemberGroupNameEn,
        P_MEMBER_GROUP_NAME_AR: MemberGroupNameAr,
        P_OWNER_USER_ID_FK: OwnerUserIdFk,
        P_PREFERENCE_CODE: PreferenceCode,
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

const updateMembersGroups = async function (req, res) {
    console.log("MemberGroupPk =" + req.query.MemberGroupPk)
    const {
        MemberGroupNameEn,
        MemberGroupNameAr,
        OwnerUserIdFk,
        PreferenceCode
    } = req.body
    const statement = `BEGIN MEMBERS_GROUPS_BUSINESS_RULES_PKG.UPDATE_MEMBERS_GROUPS(
         :P_MEMBER_GROUP_PK,
         :P_MEMBER_GROUP_NAME_EN ,
         :P_MEMBER_GROUP_NAME_AR ,
         :P_OWNER_USER_ID_FK,
         :P_PREFERENCE_CODE,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_GROUP_PK: req.query.MemberGroupPk,
        P_MEMBER_GROUP_NAME_EN: MemberGroupNameEn,
        P_MEMBER_GROUP_NAME_AR: MemberGroupNameAr,
        P_OWNER_USER_ID_FK: OwnerUserIdFk,
        P_PREFERENCE_CODE: PreferenceCode,
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


const deleteMembersGroups = async function (req, res) {

    const statement = `BEGIN MEMBERS_GROUPS_BUSINESS_RULES_PKG.DELETE_MEMBERS_GROUPS(:P_MEMBER_GROUP_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_MEMBER_GROUP_PK: req.query.MemberGroupPk,
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
module.exports = [membersGroups, membersGroupsByKey, insertMembersGroups, updateMembersGroups, deleteMembersGroups]