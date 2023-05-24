import Jwt from "jsonwebtoken";

const signAccessToken = (email, id) => {
  return new Promise((resolve) => {
    const payload = {
      email: email,
      id: id,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      issuer: "local",
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

const verifyAccessToken = (bearerToken) => {
  return new Promise((resolve) => {
    const token = bearerToken.split(" ")[1];
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
      if (err) {
        console.log(err);
      } else {
        resolve(userInfo);
      }
    });
  });
};

export default {
  signAccessToken,
  verifyAccessToken,
};
