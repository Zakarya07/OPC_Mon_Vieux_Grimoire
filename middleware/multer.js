const multer = require("multer");

const storage = multer.memoryStorage();

const image_filter = (req, file, callback) => {

    if (file.mimetype.split("/")[0] === "image") {
        callback(null, true);
    } else {
        // To get only image files uploaded
        callback(new Error("Only images are allowed"));
    }
}

exports.imageUploader = multer({
    storage, 
    fileFilter: image_filter
});

