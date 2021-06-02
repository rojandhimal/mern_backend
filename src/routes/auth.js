const express = require('express');
const router = express.Router();
const { signup, signin, requiredSignin } = require('../controller/authController');


router.post('/signup',signup);
router.post('/signin',signin);
// router.post('/profile',requiredSignin,(req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// });
    

module.exports = router;