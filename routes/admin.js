var express = require('express');
var router = express.Router();
let controller = require('../controllers/admin')

/* GET home page. */
router.post('/signup',controller.Adminsignup)
router.post('/login',controller.Adminlogin)
router.get('/read',controller.SECURE,controller.Adminread)

module.exports = router;
