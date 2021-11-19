const express = require("express");
const User = require("./userModel");
const mongoose = require("mongoose");
const {check} = require("express-validator");
const {validationResult} = require("express-validator");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next()
})
app.post('/api/dashboard/sa-management/create-new-sa', [
    check('userDetails.username').not().isEmpty(),
    check('userDetails.password').not().isEmpty(),
    check('userDetails.cpassword').not().isEmpty(),
    check('userDetails.saName').not().isEmpty()
], async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new Error("Invalid inputs!"));
    }
    const {userDetails, userPrices} = req.body;
    const {username, password, cpassword, saName, contact} = userDetails;

    if(password!==cpassword){
        return next(new Error("Passwords do not match."));
    }
    
    const newSubAgent = new User({
        userDetails:{
            username,
            password,
            subAgentName:saName,
            phone:contact
        },userPrices
    })
    await newSubAgent.save();
    res.json("In there");
});

mongoose.connect("mongodb+srv://pulse_guest:DWzXHuqPsx2bfCOq@cluster0.uowvb.mongodb.net/Pulse_proj?retryWrites=true&w=majority")
.then(()=>{
    app.listen(process.env.PORT || 5000,(req, res, next)=>{
        console.log("Connection established with port number 5000.");
    });
})
.catch(err=>{
    console.log(err);
});
//DWzXHuqPsx2bfCOq