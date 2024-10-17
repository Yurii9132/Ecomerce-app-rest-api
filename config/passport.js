const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("../db/userAuthenticationQueries")

passport.use(
  new LocalStrategy(
    {
      useremailField: 'email',
      passwordField: 'password',
    },
    async (email, password, dene) => {
      try {  
        // const user = await User.findUserByImail(email);
        // if (!user) {
  
        // }
      } catch (error) {
        next(error);
      }
    }
  ));