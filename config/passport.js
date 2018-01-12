// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

// load up the user model
var User = require("../models/User");

// expose this function to our app using module.exports
module.exports = function(passport) {
  // Passport session setup

  // Serialize the user for the sesion
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // ========================================================================
  // Local Signup
  // ========================================================================

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "name",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, name, password, done) {
        process.nextTick(function() {
          User.findOne({ name: name }, function(err, user) {
            if (err) return done(err);

            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken")
              );
            } else {
              var newUser = new User();

              newUser.name = name;
              newUser.password = newUser.generateHash(password);

              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  // ========================================================================
  // Local Login
  // ========================================================================

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "name",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, name, password, done) {
        User.findOne({ name: name }, function(err, user) {
          if (err) return done(err);
          if (!user)
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            );
          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );
          return done(null, user);
        });
      }
    )
  );
};
