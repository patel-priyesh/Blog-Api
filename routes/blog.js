var express = require('express');
var router = express.Router();
let controller = require('../controllers/blog')
const multer = require("multer")
let authorcontroller = require('../controllers/author')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/blog-image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+file.originalname.split('.').pop())
    }
  })
  
  const upload = multer({ storage: storage })

/* GET home page. */
router.post('/creat',authorcontroller.SECURE,upload.array('images',2),controller.blogcreat)
router.get('/read',authorcontroller.SECURE,controller.blogread)
router.patch('/update/:id',authorcontroller.SECURE,upload.array('images',2),controller.blogupdate)
router.delete('/delete/:id',authorcontroller.SECURE,controller.blogdelete)

module.exports = router;
