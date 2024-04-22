const multer = require('multer')
const fs = require('fs')
const path = require('path')


//for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destination = 'public/uploads'

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true })
        }
        cb(null, destination)
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let fname = path.basename(file.originalname, ext)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = fname + uniqueSuffix + ext
        cb(null, filename)
    }
})


//for file storage
const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destination = 'public/documents';

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let fname = path.basename(file.originalname, ext)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = fname + uniqueSuffix + ext
        cb(null, filename)
    }
});

//file filter for images
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(webp|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG|jpg|JPG|jfif|JFIF)/)) {
        return cb(new Error("Invalid image file"), false)
    }
    cb(null, true)
}

//file filter for pdf files
const pdfFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|PDF)/)) {
        return cb(new Error("Invalid PDF file"), false)
    }
    cb(null, true)
}



const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 2000000
    }
})


const pdfUpload = multer({
    storage: pdfStorage,
    fileFilter: pdfFilter,
    limits: {
        fileSize: 5000000
    }
})

// module.exports = {
//     upload: upload,
//     pdfUpload: pdfUpload
// }

module.exports = upload
module.exports = pdfUpload

