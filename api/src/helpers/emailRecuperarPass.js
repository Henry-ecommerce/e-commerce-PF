const nodemailer = require("nodemailer");

const recuperarContra = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, name, token } = datos;

  const info = await transport.sendMail({
    from: "E-comers",
    to: email,
    subject: "Recupera tu cuenta",
    text: "Recupera tu cuenta",
    html: `<h2>E-comers</h2>
    <p>Hola: ${name}, has solicitado restablecer tu contraseña</p>
    <p>Click en el enlace para generar una nueva contraseña
    <a href="${process.env.FRONTEND_URL}/recueperar-pass/${token}">Restablecer contraseña</a></p>

    <p><span>Si tu no creaste la cuenta, puedes ignorar el mensaje ☺</span></p>
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

module.exports = {
  recuperarContra,
};
