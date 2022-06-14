const jwt = require("jsonwebtoken");
const { Usuario } = require("../db.js");

const checkAuth = async (req, res, next) => {
  let token;
  if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.registro = await Usuario.findByPk(decoded.id, {
        attributes: ["id", "name", "email", "rol"],
      });

      return next();
    } catch (error) {
      const errodr = new Error("Tonken invalido");
      res.status(403).json({ msg: errodr.message });
      next();
    }
  }
  if (!token) {
    // console.log(req.headers.authorization)
    const error = new Error("Tonken invalido o inexistente");
    return res.status(403).json({ msg: error.message });
  }
  next();
};

module.exports = {
  checkAuth,
};
