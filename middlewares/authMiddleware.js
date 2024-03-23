const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the user
    const token = req.headers["authorization"];
    // console.table([token, typeof token]);
    const tokenValue = token.split(" ")[1];

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    console.log("Decoded : ", decoded);

    if (decoded.id) {
      req.body.id = decoded.id;
      next();
    } else {
      return res.status(401).send({
        message: "Unauthorized Access",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while authenticating the user",
      status: false,
      error,
    });
  }
};

module.exports = authMiddleware;
