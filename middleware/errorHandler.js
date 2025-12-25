// Created a constants file to import all the constants object
const { constants } = require("../constants");

const errorHandler = (err,req,res,next) => {
    // Pass the Status Code back if we have it or send 500 if nothing is passed
    const statusCode = res.statusCode ? res.statusCode : 500; 
    console.log(err.stack);
    switch (statusCode) {

        // case 400: // Created a constants file to import all the constant object values
        case constants.VALIDATION_ERROR:
        res.json({title: "Validation failed", message: err.message, stackTrace: err.stack});
        break; 

        // case 404: // Created a constants file to import all the constant object values
        case constants.UNAUTHORIZED:
        res.json({title: "UnAuthorized", message: err.message, stackTrace: err.stack});
        break; 

        case constants.FORBIDDEN:
        res.json({title: "FORBIDDEN", message: err.message, stackTrace: err.stack});
        break; 

        case constants.SERVER_ERROR:
        res.json({title: "Server Error", message: err.message, stackTrace: err.stack});
        break; 

        case constants.NOT_FOUND:
        res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
        break; 


        default: 
        console.log("No Error, All good !", statusCode);
        break;
    }
    
};

module.exports = errorHandler;