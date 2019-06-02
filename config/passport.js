const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        const verifyConnection = await db.query("SELECT * FROM login WHERE email = ? AND password = ?", [email, password])

        if (!verifyConnection.length) {
            return done(null, false, { message: "password or email incorrect" })
        }
        return done(null, verifyConnection[0]);
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser( async (id, done) => {
        const searchUserById = await db.query("SELECT * FROM login WHERE id =  ?", [id])
        done(null,searchUserById[0])
    });
}