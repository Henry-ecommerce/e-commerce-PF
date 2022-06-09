const nodemailer = require("nodemailer");

const emailRegistro = async (datos) => {
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
    subject: "Comprueba tu cuenta para completar el registo",
    text: "Comprueba tu cuenta en apv",
    html: `<h2>E-comers</h2>
    <p>Hola: ${name}, comprueba tu cuenta para completar el registro </p>
    <p>Click en el siguente enlace para finalizar con el registro:
    <a href="${process.env.FRONTEND_URL}/login/confirmar/${token}">Comprobar cueta</a></p>

    <p><span>Si tu no creaste la cuenta, puedes ignorar el mensaje ☺</span></p>
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

module.exports = {
  emailRegistro,
};
