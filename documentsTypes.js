const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const documentsTypes = async function (req, res) {
    const statement = `BEGIN DOCUMENTS_TYPES_BUSINESS_RULES_PKG.GET_DOCUMENTS_TYPES(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const documentsTypesByKey = async function (req, res) {
    let DocTypeCodePk = req.params.DocTypeCodePk
    const statement = `BEGIN DOCUMENTS_TYPES_BUSINESS_RULES_PKG.GET_DOCUMENTS_TYPES_BY_ID(:P_DOC_TYPE_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_TYPE_CODE_PK: DocTypeCodePk,
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

const insertDocumentsTypes = async function (req, res) {
    const {
        DocTypeNameEn,
        DocTypeNameAr
    } = req.body
    const statement = `BEGIN DOCUMENTS_TYPES_BUSINESS_RULES_PKG.INSERT_DOCUMENTS_TYPES(
         :P_DOC_TYPE_NAME_EN ,
         :P_DOC_TYPE_NAME_AR ,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_TYPE_NAME_EN: DocTypeNameEn,
        P_DOC_TYPE_NAME_AR: DocTypeNameAr,
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

const updateDocumentsTypes = async function (req, res) {
    console.log("DocTypePk =" + req.query.DocTypeCodePk)
    const {
        DocTypeNameEn,
        DocTypeNameAr
    } = req.body
    const statement = `BEGIN DOCUMENTS_TYPES_BUSINESS_RULES_PKG.UPDATE_DOCUMENTS_TYPES(
        :P_DOC_TYPE_CODE_PK,
        :P_DOC_TYPE_NAME_EN ,
        :P_DOC_TYPE_NAME_AR ,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_TYPE_CODE_PK: req.query.DocTypeCodePk,
        P_DOC_TYPE_NAME_EN: DocTypeNameEn,
        P_DOC_TYPE_NAME_AR: DocTypeNameAr,
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


const deleteDocumentsTypes = async function (req, res) {

    const statement = `BEGIN DOCUMENTS_TYPES_BUSINESS_RULES_PKG.DELETE_DOCUMENTS_TYPES(:P_DOC_TYPE_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_TYPE_CODE_PK: req.query.DocTypeCodePk,
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
module.exports = [documentsTypes, documentsTypesByKey, insertDocumentsTypes, updateDocumentsTypes, deleteDocumentsTypes]