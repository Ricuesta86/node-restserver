const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const { verificarTokenImg } = require('../middlewares/autenticacion');


router.get('/:tipo/:img', verificarTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let imagenPath = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(imagenPath)) {
        res.sendFile(imagenPath);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }

});



module.exports = router;