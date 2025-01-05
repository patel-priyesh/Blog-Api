var express = require('express');
var router = express.Router();
const controller = require("../controllers/author")
const multer = require("multer")
let admincontroller = require('../controllers/admin')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/author-image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+file.originalname.split('.').pop())
    }
  })
  
  const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/read',admincontroller.SECURE,controller.Authorread);
router.post('/signup',upload.single('profile'),controller.Authorsignup);
router.post('/login',controller.Authorlogin);
router.patch('/update/:id',upload.single('profile'),controller.AuthorUpdate);
router.delete('/delete/:id',admincontroller.SECURE,controller.Authordelete);

module.exports = router;
