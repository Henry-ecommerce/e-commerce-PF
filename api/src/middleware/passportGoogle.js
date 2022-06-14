const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//*const { GoogleUser } = require("../db");
const GOOGLE_CLIENT_ID =
  "762533381180-k9cv38brtn66j4k3a83ltmunq0kv6dt5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ accessToken });
      console.log({ refreshToken });
      console.log({ profile });
      console.log({ profile });
      console.log({ done });
      // GoogleUser.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
