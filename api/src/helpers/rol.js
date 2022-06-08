const generarUser = (rol) => {
  if (rol === "Limon") {
    return "Admin";
  } else if (rol === "Moderador") {
    return "Moderador";
  } else {
    return "User";
  }
};

module.exports = {
  generarUser,
};
