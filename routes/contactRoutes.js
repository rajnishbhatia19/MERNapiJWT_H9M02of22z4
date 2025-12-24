const express = require("express");
const router = express.Router();

/* Moved to contactController.js [Step 2 (before contactControllers req,res journeys)]

router.route("/").get((req,res) => {
    res.status(200).json({ message: "Get all contacts"});
}) 

router.route("/").post((req,res) => {
    res.status(200).json({ message: "Create contact"});
})

router.route("/:id").get((req,res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}`});
})

router.route("/:id").put((req,res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}`});
})

router.route("/:id").delete((req,res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}`});
})

*/

const { 
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact 
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenhandler");

router.use(validateToken); // To use it on all the routes, this is easier, else you can individually add to each function separately as done in userRoutes.js /current route function
router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

/* 
Alternate way to write above 5 statements to save 3 lines

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

*/

//Need to export our routes

module.exports = router;