require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const index = require('./routes/index');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//  Configuración global de las Rutas
app.use(index);


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos Online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});