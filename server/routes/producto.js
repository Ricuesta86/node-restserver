const router = require('express').Router();
const _ = require('underscore');
const { verificarToken } = require('../middlewares/autenticacion');
const Producto = require('../models/producto');


// ============================================
// Muestra todos los productos
// ============================================
router.get('/', verificarToken, (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 10;
    Producto.find({})
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });

});

// ============================================
// Muestra el producto por el ID
// ============================================
router.get('/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El producto no se encuentra.'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });

});

// ============================================
// Buscar producto 
// ============================================
router.get('/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .sort('nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });

});


// ============================================
// Crea un nuevo producto 
// ============================================
router.post('/', verificarToken, (req, res) => {

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no se creo correctamente.'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

// ============================================
// Actualiza el producto por el ID
// ============================================
router.put('/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria']);

    Producto.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no se actualizo correctamente'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    })

});

// ============================================
// Elimina el producto por el ID
// ============================================
router.delete('/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndDelete(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no se encuentra.'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });

});



module.exports = router;