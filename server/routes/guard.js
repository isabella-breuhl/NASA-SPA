var express = require('express');
var router = express.Router();

router.all("*", (req, res, next) => {
   /* Below syntax from : https://www.w3schools.com/jsref/jsref_startswith.asp */
   /* Unguarded feature for Guest users */
   if (req.path.startsWith("/features/astroids")) {
      if (!req.isAuthenticated()) {
         console.log("User: GUEST");
      }
      return next();
   }

   console.log("Guarded middleware req.user");
   console.log("User: " + req.user);
   if( req.isAuthenticated() ) {
      return next();
   }
   res.status(401).json({message : "Unauthenticated"});
});

module.exports = router;