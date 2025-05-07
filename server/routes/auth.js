var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
   async (username, password, done) => {
      const user = await User.findOne({username});
      if (!user) {
        return done(null, false, { message: 'Incorrect credentials' });        
      }
       
      // Below syntax from https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09 */
      // Compare hashed passwords
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log("Error comparing to hashed password");
          return;
        }

        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
   }
 ));

 passport.serializeUser((user, done) => {
   console.log(`serialize user (${user})`);
   done(null, user._id );
 });
 
 passport.deserializeUser(async (_id, done) => {
   console.log(`deserialize user (${_id})`);
   const user = await User.findOne({_id});
   if ( user ) {
     done(null, user);
   } else {
     done(new Error('User not found'));
   }
 });

 router.post('/login', 
   passport.authenticate('local', { 
     failureMessage: true 
   }),
   (req, res) => {
     res.json( req.user );
   }
 );
 
 router.get('/logout', (req, res) => {
   req.logout((err) => {
     if (err) {
       res.status(500).json({ message: 'Logout failed' });
     }

     /* Below syntax from: https://medium.com/@alysachan830/cookie-and-session-iii-simple-express-session-authentication-example-6dedf9d2288b */
     req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
     })
   });
 });
 
module.exports = router;