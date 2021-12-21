require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();
const router = express.Router()
const usuario = require('./routes/usuario');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(usuario);

// app.get('/', (req, res) => {
//     res.send('Holamundo')
// })


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos Online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});