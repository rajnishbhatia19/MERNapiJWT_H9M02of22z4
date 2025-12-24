const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) =>  {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    //console.log("I am inside");
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        //console.log(token);
         // 1st parameter is token
        // 2nd parameter is secret
        // 3rd parameter is a callback function
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=> {
            if(err){
                res.status(401); // UnAuthorized
                throw new Error ("User is not authorized");
            }
            //You can also append it on the request itself
            req.user = decoded.user;
            
            console.log(decoded);
            // Intercept the request and append user info and move to the next function after middleware
            res.status(200);
            next();


        });
    }
     if (!token) {
        console.log("Login Required");
        res.status(401);// UnAuthorized
        throw new Error("User is not Authorized or token is missing");
    };
    
});

module.exports = validateToken;