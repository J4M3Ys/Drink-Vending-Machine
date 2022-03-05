const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  }); //Expires in 30 minutes.
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      code: 401,
      status: "Failed.",
      message: "Unauthorized.",
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        code: 403,
        status: "Failed.",
        message: "Forbidden.",
      });

    req.user = user;
    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
