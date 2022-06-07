const jwt = require("jsonwebtoken");
const { use } = require("../Routes/controllers/login/registo");

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
