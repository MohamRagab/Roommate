const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const oracledb = require('oracledb')
const executeOperationsDB2 = require('./oracleDbConnWithPkg')
const accessTokenSecret = 'somerandomaccesstoken'
const refreshTokenSecret = 'somerandomstringforrefreshtoken'
let refreshTokens = []
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ StatusCode: 0, StatusMessage: 'Unauthorized' })
      }

      req.user = user
      next()
    })
  } else {
    return res
      .status(401)
      .json({ StatusCode: 0, StatusMessage: 'Unauthorized' })
  }
}

const Token = async function (req, res) {
  const { token } = req.body
  if (!token) {
    const [StatusCode, StatusMessage] = [0, 'token is required']
    let outPut = { StatusCode, StatusMessage }
    // res.status(400).send(outPut);
    return res.status(201).json(outPut)
  }
  if (!refreshTokens.includes(token)) {
    const [StatusCode, StatusMessage] = [0, 'invalid token']
    let outPut = { StatusCode, StatusMessage }
    return res.status(403).json(outPut)
  }
  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      const [StatusCode, StatusMessage] = [0, 'invalid token']
      let outPut = { StatusCode, StatusMessage }
      return res.status(403).json(outPut)
    }
    const accessToken = jwt.sign(
      { UserId: user.UserId, Email: user.Email },
      accessTokenSecret,
      { expiresIn: '2m' }
    )
    res.json({
      accessToken
    })
  })
}



const login = async function (req, res) {
  const statement = `BEGIN USERS_BUSINESS_RULES_PKG.GET_USERS_BY_ID(:EMAIL,:cursor,:STATUS_CODE,:STATUS_MESSAGE); END;`
  const { Email, Password } = req.body

  const bindVars = {
    EMAIL: Email,
    cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    STATUS_CODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    STATUS_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR }
  }
  let DataRes = await executeOperationsDB2(statement, bindVars)
  if (DataRes.StatusCode == 0) {
    return res.status(500).send(DataRes)
  }
  if (
    DataRes.ResponseData.length > 0 &&
    Password &&
    (await bcrypt.compare(Password, DataRes.ResponseData[0].Password))
  ) {
    const accessToken = jwt.sign(
      { UserId: DataRes.ResponseData[0].UserId, Email },
      accessTokenSecret,
      { expiresIn: '20m' }
    )
    const refreshToken = jwt.sign(
      { UserId: DataRes.ResponseData[0].UserId },
      refreshTokenSecret
    )
    refreshTokens.push(refreshToken)
    return res.json({
      accessToken,
      refreshToken
    })
  } else {
    const [StatusCode, StatusMessage] = [0, 'invalid credentials']
    let outPut = { StatusCode, StatusMessage }
    return res.status(400).send(outPut)
  }
}
const logout = (req, res) => {
  const { token } = req.body
  let checkToken = refreshTokens.find(t => t == token)
  if (checkToken) {
    refreshTokens = refreshTokens.filter(t => t !== token)
    const [StatusCode, StatusMessage] = [0, 'Logout successful']
    let outPut = { StatusCode, StatusMessage }
    return res.status(200).json(outPut)
  }
  const [StatusCode, StatusMessage] = [0, 'invalid token']
  let outPut = { StatusCode, StatusMessage }
  return res.status(403).json(outPut)
}
module.exports = [authenticateJWT, Token, login, logout]
