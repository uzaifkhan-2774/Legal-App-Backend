import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  let isAuthorized = req?.headers?.authorization;

  // console.log(isAuthorized)
  try {
    if (!isAuthorized) {
      return res.status(401).json({
        message: "User is not authorized.. please enter with token",
      });
    }

    let verifiedToken = isAuthorized.startsWith("Bearer");

    if (!verifiedToken) {
      return res.status(400).json({
        message: "token is not authorized.. please enter with valid token",
      });
    }

    let token = isAuthorized.split(" ")[1];

    let decode = jwt.verify(token, "this is the legal app");

    if (decode) {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: `${error} server error..`,
    });
  }
};

export default authMiddleware;
