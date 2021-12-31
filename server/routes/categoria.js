const express = require('express');
const router = express.Router();
const _ = require('underscore');
const { verificarToken, verificarAdmin_Role } = require('../middlewares/autenticacion');
const Categoria = require('../models/categoria');


// ============================================
// Mostrar todas las categorias
// ============================================
router.get('/', verificarToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({}, 'descripcion')
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Categoria.count({}).exec((err, cuantos) => {
                res.json({
                    ok: true,
                    cuantos,
                    categoria: categoriaDB
                });
            });
        });
});

// ============================================
// Mostrar la categoria por ID
// ============================================
router.get('/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ============================================
// Crear una nueva categoria 
// ============================================
router.post('/', verificarToken, (req, res) => {

    let usuario = req.usuario;

    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ============================================
// Actualizar la categoria por ID
// ============================================
router.put('/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// ============================================
// Eliminar la categoria por ID
// ============================================
router.delete('/:id', [verificarToken, verificarAdmin_Role], (req, res) => {

    let id = req.params.id;
    // Categoria.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, categoriaDB) => {
    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


module.exports = router;