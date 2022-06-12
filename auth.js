const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
// console.log("token " + token )
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  // console.log("req.user = "+req.user)
  try {
    // console.log("xxxxxxxxxxxxxxxxxx")
    const decoded = jwt.verify(token,"${process.env.SECRET_TOKEN}" +   config.SECRET_TOKEN);
    // console.log("decoded " +JSON.parse(decoded) )
  //  console.log("----------------------")
    // req.user = decoded;
  } catch (err) {
    // console.log(err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
