import Jwt from "jsonwebtoken";

const signAccessToken = (userDetail) => {
  return new Promise((resolve, reject) => {
    const payload = {};

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      issuer: "local",
      audience: userDetail,
    };

    Jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
    if (err) throw err;
    res.json(userInfo);
  });
};

export default {
  signAccessToken,
  verifyAccessToken,
};
