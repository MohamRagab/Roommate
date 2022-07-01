const bcrypt = require("bcryptjs");
const { query } = require("express");
const oracledb = require('oracledb');
const executeOperationsDB2 = require('./oracleDbConnWithPkg');

const documents = async function (req, res) {
    const statement = `BEGIN DOCUMENTS_BUSINESS_RULES_PKG.GET_DOCUMENTS(:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
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


const documentsByKey = async function (req, res) {
    let DocCodePk = req.params.DocCodePk
    const statement = `BEGIN DOCUMENTS_BUSINESS_RULES_PKG.GET_DOCUMENTS_BY_ID(:P_DOC_CODE_PK,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_CODE_PK: DocCodePk,
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

const insertDocuments = async function (req, res) {
    const {
        DocNameEn,
        DocNameAr,
        DocPath,
        DocTypeFk

    } = req.body
    const statement = `BEGIN DOCUMENTS_BUSINESS_RULES_PKG.INSERT_DOCUMENTS(
         :P_DOC_NAME_EN ,
         :P_DOC_NAME_AR ,
         :P_DOC_PATH,
         :P_DOC_TYPE_FK,
         :STATUS_CODE,
         :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_NAME_EN: DocNameEn,
        P_DOC_NAME_AR: DocNameAr,
        P_DOC_PATH: DocPath,
        P_DOC_TYPE_FK: DocTypeFk,
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

const updateDocuments = async function (req, res) {
    console.log("DocCodePk =" + req.query.DocCodePk)
    const {
        DocNameEn,
        DocNameAr,
        DocPath,
        DocTypeFk
    } = req.body
    const statement = `BEGIN DOCUMENTS_BUSINESS_RULES_PKG.UPDATE_DOCUMENTS(
        :P_DOC_CODE_PK,
        :P_DOC_NAME_EN ,
        :P_DOC_NAME_AR ,
        :P_DOC_PATH ,
        :P_DOC_TYPE_FK,
        :STATUS_CODE,
        :STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_CODE_PK: req.query.DocCodePk,
        P_DOC_NAME_EN: DocNameEn,
        P_DOC_NAME_AR: DocNameAr,
        P_DOC_PATH: DocPath,
        P_DOC_TYPE_FK: DocTypeFk,
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


const deleteDocuments = async function (req, res) {

    const statement = `BEGIN DOCUMENTS_BUSINESS_RULES_PKG.DELETE_DOCUMENTS(:P_DOC_CODE_PK,:STATUS_CODE,:STATUS_MESSAGE); END;`;
    const bindVars = {
        P_DOC_CODE_PK: req.query.DocCodePk,
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
module.exports = [documents, documentsByKey, insertDocuments, updateDocuments, deleteDocuments]