//Controllers is going to have the logic for all request/response and will connect with our database
//When we create API methods, we also need to give some labels to them

// Whenever we interact with mongodb, we get back a promise
// To ensure proper return of a promise, use async and try catch block
// But to repeatedly having try catch is painful, so use a middleware express async handler,
// which allows to handle exceptions inside the async express routes and pass it to errorHandler
// to install, use npm i express-async-handler and then import
const asyncHandler = require("express-async-handler");
// Then you can wrap the async function within asynchHandler function
// Then goto MongoDB.com and create a free cluster 
// Download vscode plugin https://www.mongodb.com/products/tools/vs-code 
// In the MongoDB Plugin, set up the db as mongodb+srv://admin:admin@rajcluster0.qbhk6nn.mongodb.net/mycontacts-backend from Compass URL
// Then connect via MongoDB Driver for Node.js after installing npm install mongodb [starting with .env variable]
// mongodb+srv://<db_username>:<db_password>@rajcluster0.qbhk6nn.mongodb.net/?appName=RajCluster0
// Then use Mongoose, which is an object model design schema for entities like contacts or user and helps communicate with mongodb DB
// npm i mongoose [whenever installation finishes, you can check in package.json]
// Create Mongoose contact Schema [under models folder]
// Then add back contact model within contactController.js 
const Contact = require("../models/contactModel");
const { constants } = require("../constants");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res) => {
    // res.status(200).json({ message: "Get all contactController contacts"})
    //const contacts = await Contact.find(); // add await since we are going to wait for mongoDB to return value
    const contacts = await Contact.find({ user_id: req.user.id }); // find contacts for the logged in user only
    res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById({_id: req.params.id});
    if(!contact)
    {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found");
    }
    else{
        res.status(200);
        console.log(contact);
        res.status(200).json(contact);
        //res.status(200).json(contact);
    }
    // res.status(200).json({ message: `Get contactController contact for ${req.params.id}`});
});



//@desc Create contact
//@route POST /api/contacts
//@access private

// const createContact = (req,res) => {
// Since we are going to use mongodb and the Mongoose. 
// mongodb always get a promise so in order to resolve a promise, we need to have async await, 
// so add await to the definition 

const createContact = asyncHandler(async (req,res) => {
    console.log("The request body is ", req.body);
    // To avoid blank json body being passed, we'll check the conditions
    const {name, email, phone} = req.body;
    if (!name || (!email || !phone)){
        res.status(400);
        throw new Error ("All fields are Mandatory");
        // This will be throwing as HTML error 
        // If we want to change it, we need to build a custom middleware, which is going 
        // to accept the request response and then in between and transform the response 
        // into Json
    }
    const contact = await Contact.create({ 
        name,
        email,
        phone,
        user_id: req.user.id
    });
    // res.status(201).json({ message: "Create contactController contact"})
    res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403); //Not Authorized 
        throw new Error("User does not have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );
    res.status(200).json(updatedContact);
    // res.status(200).json({ message: `Update contactController contact for ${req.params.id}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req,res) => {
    console.log("I am here");
    const contact = await Contact.findById(req.params.id);
    console.log("I am here2", contact);
    if (!contact) {
        res.status(404); // Not Found
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403); //Not Authorized 
        throw new Error("User does not have permission to update other user contacts");
    }

    console.log("I am here3");
    //console.log("found id ", json(contact));
    //await contact.remove();
    // Not fully working
    await contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
    // res.status(200).json({ message: `Delete contactController contact for ${req.params.id}`});
});


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };