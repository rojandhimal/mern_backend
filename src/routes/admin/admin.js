const express = require('express');
const router = express.Router();
const { signup, signin} = require('../../controller/admin/adminController');


router.post('/admin/signup',signup);
router.post('/admin/signin',signin);


module.exports = router;