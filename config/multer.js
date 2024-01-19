const multer = require('multer');

// tạo storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })
module.exports = upload;