const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the user
    const token = req.headers["authorization"];
    // console.table([token, typeof token]);
    const tokenValue = token.split(" ")[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Un-authorised user",
          status: false,
          err,
        });
      } else {
        req.body.id = decoded.id;
        // console.log("decoded ", decoded);
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Please provide auth token",
      status: false,
      error,
    });
  }
};

module.exports = authMiddleware;
