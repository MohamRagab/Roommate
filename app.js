const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
const app = express();
const auth = require("./middleware/auth");
const executeOperationsDB = require('./oracleDbConn')
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

const users = async function (mail) {
    let st = "SELECT user_id,password FROM USERS WHERE email = :email";
    let stArg = [mail];
    let DataRes = await executeOperationsDB(st, stArg, 'get')
    let dataJson = JSON.parse(DataRes);
    // if(DataRes[0].USER_ID){
    //     // console.log("*** *" + DataRes)
    //     //  let dataJson = JSON.parse(DataRes);
    // //    console.log(dataJson)
    //    return dataJson;
    // }
    // console.log("***///////////////////////////////////")
   return dataJson
}


let refreshTokens = [];
app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).json({ "status": 0, "message": "All input is required" });
    }
    const usersRec = await users(email)
    const user = {...usersRec[0]}
    // console.log(user)
    if (user.PASSWORD && (await bcrypt.compare(password, user.PASSWORD))) {
        const accessToken = jwt.sign({ userId: user.USER_ID, email }, accessTokenSecret, { expiresIn: '2m' });
        const refreshToken = jwt.sign({ userId: user.USER_ID, email }, refreshTokenSecret);
        refreshTokens.push(refreshToken);
        res.json({
            accessToken,
            refreshToken
        });
    } else {
        // res.send('Username or password incorrect');
        return res.status(401).json({ "status": 0, "message": "Username or password incorrect" });
    }
});

app.post("/register", async (req, res) => {
    try {
        let Dt = req.body;
        const { email, password, userId, fullName } = req.body;
        if (!(email && password && userId && fullName)) {
            return res.status(400).json({ "status": 0, "message": "All input is required" });
        }
        const userDbData = await users(Dt.email)
        let UserDataObj = {...userDbData[0]}
        // console.log("userData*** "+ userDbData[0])
        if (UserDataObj.status==0) {
            return res.status(409).json(UserDataObj);
        }
        if (UserDataObj.USER_ID) {
            return res.status(409).json({ "status": 0, "message": "User Already Exist. Please Login" });
        }
       
        encryptedPassword = await bcrypt.hash(password, 10);

        let Insertst = `insert into users values (:email,:password,:user_id,:full_name )`;
        let InsertstArg = [Dt.email, encryptedPassword, Dt.userId, Dt.fullName];
        let insertUser = await executeOperationsDB(Insertst, InsertstArg)
        const userData = await users(email)
        if (await userData) {
            return res.status(201).json({ "status": 1, "message": "User has been registered successfully" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "status": 0, "message": "internal server error" ,"error" : err.message});

    }
});

app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        // return res.sendStatus(401);
        return res.status(201).json({ "status": 0, "message": "token is required" });
    }

    if (!refreshTokens.includes(token)) {
        // return res.sendStatus(403);
        return res.status(403).json({ "status": 0, "message": "invalid token" });

    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {

        if (err) {
            // return res.sendStatus(403);
            return res.status(403).json({ "status": 0, "message": "invalid token" });

        }
//{ userId: user.USER_ID, email }
        const accessToken = jwt.sign({ userId: user.userId, email: user.email, }, accessTokenSecret, { expiresIn: '2m' });

        res.json({
            accessToken
        });
    });
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    let checkToken  = refreshTokens.find(t => t==token);
    if(checkToken){
         refreshTokens = refreshTokens.filter(t => t !== token);
         return res.status(200).json({ "status": 1, "message": "Logout successful" });
    }
    return res.status(403).json({ "status": 0, "message": "invalid token" });

});

app.get("/welcome", authenticateJWT, (req, res) => {
    const token = req.cookies;
  
    console.log("------- " + token)
    res.status(200).send("Welcome 🙌 ");
  });
  
app.listen(7000, () => {
    console.log('auth service started on port 7000');
});