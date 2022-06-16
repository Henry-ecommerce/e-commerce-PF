const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENTD_ID =
	"51653310214-4t3i8fpfhp7skkfsj3n89jgnemuffqa9.apps.googleusercontent.com";
const CLIENTD_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRES_TOKEN =
	"1//04USOnX3PKOxQCgYIARAAGAQSNwF-L9IrCJqCj1OGoOruGIco9yrM4WuOJoR2AGhdAaRsR6JgqFngCsx6ibaQwLygcOdCi5RBe-Q";
  
const oAuth2Client = new google.auth.OAuth2(
	CLIENTD_ID,
	CLIENTD_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRES_TOKEN });

const recuperarContra = async (datos) => {
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
