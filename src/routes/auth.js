const express = require('express');
const router = express.Router();
const { signup, signin, requiredSignin } = require('../controller/authController');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/auth');


router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
// router.post('/profile',requiredSignin,(req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// });
    

module.exports = router;