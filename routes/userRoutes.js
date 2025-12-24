const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenhandler");

const router = express.Router();

/*
router.post("/register", (req, res)=> {
    res.json({ messsage: "Register the user"});
});

router.post("/login", (req, res)=> {
    res.json({ messsage: "Login the user"});
});

router.post(t"/current", (req, res)=> {
    res.json({ messsage: "Current user"});
});
*/
router.get("/current", validateToken, currentUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
//router.get("/current", currentUser);

//Adding validate token middleware to ensure that it's a protected route now 
/*{
  "email": "rajnishbhatia2@hotmail.com",
  "password": "123456"
}*/


module.exports = router;