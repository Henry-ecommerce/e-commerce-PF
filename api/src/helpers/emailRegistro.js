const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENTD_ID =
  "51653310214-roqgisuuk3321m5if0h2r20fvc1jip1c.apps.googleusercontent.com";
const CLIENTD_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRES_TOKEN =
  "1//04-Rx7EhCfX9tCgYIARAAGAQSNwF-L9Ir2KLC_0zCeqe2D2i8rdh1UP6qEpGMNXtQxN_uAblik4YHhRNF6SF3OWUHIA93aQNuC84";

const oAuth2Client = new google.auth.OAuth2(
  CLIENTD_ID,
  CLIENTD_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRES_TOKEN });

const emailRegistro = async (datos) => {
  const accessToken = await oAuth2Client.getAccessToken();

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
    //   pass: process.env.EMAIL_PASS,
    // },
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
