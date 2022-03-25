import express from "express";
import { userAuthService } from "../services/userService";

const googleAuthRouter = express();

const cookieParser = require( 'cookie-parser');
const session = require('express-session');

googleAuthRouter.use(
  session({
      secret: "secret key",
      resave: false,
      saveUninitialized: false,
  })
);


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

googleAuthRouter.use(passport.initialize());
googleAuthRouter.use(passport.session());

// passport 설치하기
// $ npm install passport-google-oauth20



const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
}

const verifyCallback = (accessToken, refreshToken, profile, cb) => {
  console.log("google profile", profile.id);
  let [err, user] = userAuthService.getUserInfo(profile.id);
  if( err || user ){
    return document(err, user);
  }

  const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0];

  const [createdError, createdUser] = userAuthService.addUser({
        name: profile.name.familyName + profile.name.givenName,
        email: verifiedEmail.value,
        password: null
      });

    return done(createdError, createdUser)
}

passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

// Authenticate Requests
// 구글 로그인 요청
googleAuthRouter.get('/auth/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] }));


// 구글 로그인 결과
googleAuthRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), // 실패 시 redirect url
  (req, res) => {
    // Successful authentication, redirect home.
    return res
      .status(200)
      .cookie('jwt', jwt.sign(req.user, process.env.JWT_SECRET_KEY), {
        httpOnly: true
      })
      .redirect("/")  // 성공 시 redirect url
});

export { googleAuthRouter }