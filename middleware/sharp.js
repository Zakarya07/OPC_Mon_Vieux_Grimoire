const sharp = require("sharp");

module.exports = async (req, res, next) => {

    try {
        await sharp(req.file.buffer)
          .resize(500, 500)
          .toFile(`./uploads/${req.file.originalname}`)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Erreur de compression Sharp" });
    }

  next();
};
