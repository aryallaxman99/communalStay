import Jwt from "jsonwebtoken";

const signAccessToken = (email, id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email: email,
      id: id,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "1d",
      issuer: "local",
    };

    Jwt.sign(payload, secret, options, (err, token) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const signRefreshToken = (email, id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email: email,
      id: id,
    };

    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "local",
    };

    Jwt.sign(payload, secret, options, (err, token) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export default {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
