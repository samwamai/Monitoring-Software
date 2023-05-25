const jwt = require("jsonwebtoken");

const config = {
  JWT_SECRET: '12345678',
  JWT_ALGORITHM: 'HS256'
};

const RESSTATUS = {
  UNAUTHORIZED: 401,
}

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(RESSTATUS.UNAUTHORIZED).send("autionhention token is required for");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(RESSTATUS.UNAUTHORIZED).send("Invalid Token");
  }
  return next();
};

const setGetToken = (dataObject) => {
  return jwt.sign(dataObject, config.JWT_SECRET,
    {
      algorithm: config.JWT_ALGORITHM,
      expiresIn: '12h'
    });
}

module.exports.verifyToken = verifyToken;
module.exports.setGetToken = setGetToken;
