const jwt = require("jsonwebtoken");

const generarJWT = (user) => {
  return jwt.sign(
    {
      id: user.id,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = {
  generarJWT,
};