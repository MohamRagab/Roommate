const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const preferencesLookups = async function (req, res) {
    const statement = `BEGIN PREFERENCES_LOOKUP_BUSINESS_RULES_PKG.GET_PREFERENCES_LOOKUP(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const preferencesLookupsByKey = async function (req, res) {
    let PrefCodePk = req.params.PrefCodePk
    const statement = `BEGIN PREFERENCES_LOOKUP_BUSINESS_RULES_PKG.GET_PREFERENCES_LOOKUP_BY_ID(:P_PREF_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_PREF_CODE_PK: PrefCodePk,
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

const insertPreferencesLookups = async function (req, res) {
    const {
        PrefNameEn,
        PrefNameAr
    } = req.body
    const statement = `BEGIN PREFERENCES_LOOKUP_BUSINESS_RULES_PKG.INSERT_PREFERENCES_LOOKUP(
         :P_PREF_NAME_EN ,
         :P_PREF_NAME_AR ,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_PREF_NAME_EN: PrefNameEn,
        P_PREF_NAME_AR: PrefNameAr,
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

const updatePreferencesLookups = async function (req, res) {
    console.log("PrefCodePk =" + req.query.PrefCodePk)
    const {
        PrefNameEn,
        PrefNameAr
    } = req.body
    const statement = `BEGIN PREFERENCES_LOOKUP_BUSINESS_RULES_PKG.UPDATE_PREFERENCES_LOOKUP(
        :P_PREF_CODE_PK ,
        :P_PREF_NAME_EN ,
        :P_PREF_NAME_AR ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_PREF_CODE_PK: req.query.PrefCodePk,
        P_PREF_NAME_EN: PrefNameEn,
        P_PREF_NAME_AR: PrefNameAr,
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


const deletePreferencesLookups = async function (req, res) {

    const statement = `BEGIN PREFERENCES_LOOKUP_BUSINESS_RULES_PKG.DELETE_PREFERENCES_LOOKUP(:P_PREF_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_PREF_CODE_PK: req.query.PrefCodePk,
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
module.exports = [preferencesLookups, preferencesLookupsByKey, insertPreferencesLookups, updatePreferencesLookups, deletePreferencesLookups]