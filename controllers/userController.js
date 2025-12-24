const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a User
//@route POST /api/users/register
//@access public
/* const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register the user"});
});*/

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400); // Validation Failed
        throw new Error ("All fields are mandatory");
    }
    const userAvaialable = await User.findOne({email});
    if (userAvaialable) {
        res.status(400); 
        throw new Error("User already registered!");
    }

    // Hash the password using bcrypt - So import it 
    const hashedPassword = await bcrypt.hash(password, 10); // 10 represents the solved rounds hashing of the passwords for example
    console.log("Hashed Password : ", hashedPassword);
    const user = await User.create({
        username, 
        email,
        password: hashedPassword,
    });
    console.log(`User created`, {user});
    if(user) {
        res.status(201).json({_id: user.id, email: user.email}); // 201 resouce created
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});

});

//@desc Login User
//@route POST /api/users/login
//@access public
    /*const loginUser = asyncHandler(async (req, res) => {
        res.json({ message: "Login the user"});
    });
    */

const loginUser = asyncHandler(async(req,res) => {
// To protect the login route, install JWT - npm i jsonwebtoken
// Whenever the user is passing the email id and password, we need to match it in the DB
// And then provide back the user a JWT access token
    const {email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory - email and password");
    }
    const user = await User.findOne( { email});
    // compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,

                //Define ACCESS_TOKEN_SECRET in .env file for lower environments and secure with Hashi/HSM or something in prod
            },
        }, 
        // provide the access token secret 
        process.env.ACCESS_TOKEN_SECRET,
        // define expiration token
        //{expiresIn: "1m"}
        {expiresIn: process.env.expiresIn}
    );
        res.status(200).json({accessToken});

        // Now you can protect private routes with this access token like current user info

        // Need to build a middleware which is going to allow us to validate token which a client is sending in request as a bearer token
    }
    else {
        res.status(401); // Email or Password is not valid
        throw new Error("password is not valid");
    }
    
});

//@desc Get Current User Info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    //res.json({ message: "Current user"});
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };