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

const emailCompraAdmin = async (datos) => {
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
  });
  const { email, name } = datos;

  const info = await transport.sendMail({
    from: "E-comers",
    to: email,
    subject: "Pedido user notification",
    text: "Pedido user notification",
    html: `<h2>E-comers</h2>
    
    <h3>Hola ${name}</h3>

    <p>Compra confrimada</p>

    <p>el envio esta en proceso😄</p>

     <p><span>Si tu no creaste la cuenta, puedes ignorar el mensaje ☺</span></p>
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

module.exports = {
  emailCompraAdmin,
};

{
  /* <p>Click en el enlace para generar una nueva contraseña
<a href="${process.env.FRONTEND_URL}/login/newPassword/${token}">Restablecer contraseña</a></p> */
}
