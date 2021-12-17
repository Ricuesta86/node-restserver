require('./config/config');

const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.get('/usuario', (req, res) => {
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    res.json({
        'persona': body
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({ id });
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({ id });
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});