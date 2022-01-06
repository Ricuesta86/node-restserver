const router = require('express').Router();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');
const producto = require('../models/producto');


router.put('/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha cargado ningun archivo'
            }
        });
    }

    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tpos validos son ' + tiposValidos.join(', ')
            },
            tipo
        });
    }


    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
    let archivo = req.files.archivo;

    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];


    let extensionesValidas = ['jpg', 'gif', 'png', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La extensiones validas son ' + extensionesValidas.join(', ')
            },
            extension
        });
    }

    let nombreAchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    let uploadPath = `uploads/${tipo}/${nombreAchivo}`;

    // let uploadPath = `public/uploads/${tipo}/${nombreAchivo} `;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });
        if (tipo === 'usuarios')
            imagenUsuario(id, res, nombreAchivo);
        else
            imagenProducto(id, res, nombreAchivo);
    });
});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioBD) => {
        if (err) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioBD) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe.'
                }
            });
        }

        borrarArchivo(usuarioBD.img, 'usuarios');

        Usuario.findByIdAndUpdate(usuarioBD.id, { img: nombreArchivo }, { new: true, runValidators: true }, (err, usuarioGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioGuardado,
            });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            borrarArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe.'
                }
            });
        }

        borrarArchivo(productoDB.img, 'productos');

        Producto.findByIdAndUpdate(productoDB.id, { img: nombreArchivo }, { new: true, runValidators: true }, (err, productoGuardados) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardados,
            });
        });
    });
}

function borrarArchivo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);


    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = router;