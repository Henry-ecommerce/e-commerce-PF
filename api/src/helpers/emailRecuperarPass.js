const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENTD_ID =
  "252263736230-sa7uubqje9svv532kd7dlgust640jqcb.apps.googleusercontent.com";
const CLIENTD_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRES_TOKEN =
  "1//04kTuWPa4yElKCgYIARAAGAQSNwF-L9Ir8bCgqoRlzUDoWxueapSzUw9wkWIa5-EHKKLwC2j4t8IkBD06DJl6G9yBCy41RowPBrg";

const oAuth2Client = new google.auth.OAuth2(
  CLIENTD_ID,
  CLIENTD_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRES_TOKEN });

const recuperarContra = async (datos) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "sdmoreno51@gmail.com",
      clientId: CLIENTD_ID,
      clientSecret: CLIENTD_SECRET,
      refreshToken: REFRES_TOKEN,
      accessToken: accessToken,
    },
    //preuvas
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // auth: {
    //   user: process.env.EMAIL_USER,
    //   pass: process.env.EMAIL_PASS,
    // },
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
    <a href="${process.env.FRONTEND_URL}/login/newPassword/${token}">Restablecer contraseña</a></p>

    <p><span>Si tu no creaste la cuenta, puedes ignorar el mensaje ☺</span></p>
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

module.exports = {
  recuperarContra,
};
