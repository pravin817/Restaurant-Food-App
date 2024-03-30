const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the user
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send({
        message: "Authorization header is missing",
        success: false,
      });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Token is missing",
        success: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
