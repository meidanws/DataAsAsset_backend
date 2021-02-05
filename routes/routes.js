const { response } = require('express');
const express = require('express');
require('express-async-errors');
const router = require('express').Router();
const signUpTemplateCopy = require('../models/SignUpModles');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../models/Validation');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var cors = require('cors')

// Register
router.post('/signup', async (request,response) => {
    
    //Validate 
//    const {error} = registerValidation(request.body);
//    if (error) return response.status(400).send(error.details[0].message);

   // checking user is not exsist in DB
   const userNameExsist = await signUpTemplateCopy.findOne({userName: request.body.userName});
   if(userNameExsist) return response.status(400).send('user name alerady exists');  

   // Hash the password 
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(request.body.password,salt);

   // Create a new user
   const signUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    userName: request.body.userName,
    email: request.body.email,
    password: hashedPassword
    });

    try {
    const saveduser = await signUpUser.save()
    response.send(saveduser);
    } 
    catch (err) {
       response.status(400).send(err);
    }
});


// Login
router.post('/login', async (request,response) => {
 
    // const { error } = loginValidation(request.body);
    // if(error) return response.status(400).send(error.details[0].message);

    // Check if username exsist
    const user = await signUpTemplateCopy.findOne({userName: request.body.userName});
    if (!user) {return response.status(400).send('user name not correct')};

    //check password
    const validPassword = await bcrypt.compare(request.body.password, user.password)
    if(!validPassword) return response.status(400).send('password not correct')

    // Create and assign a token 
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    
    try {
    response.send('sucsess!');
    }
    catch (err) {
        response.json(err)
        }
 });

module.exports = router