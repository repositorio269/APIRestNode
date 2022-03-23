const express = require('express');
const app = express();
const Cliente = require('../models/cliente');

app.get('/', (req, res) => { // Ejemplo sin paginar no usar en prod

    Cliente.find({}, (err, clientes) => {
        if(err) {
            return res.status(500).json({
                message: 'Dabase error'
            })
        }
        res.status(200).json({
            message: 'ok',
            clientes
        })
    })
})

app.get('/search/:term', (req, res) => {
    const metaTerm = "^" + req.params.term.replace(/á/ig, 'a').replace(/é/ig, 'e').replace(/í/ig, 'i').replace(/ó/ig, 'o').replace(/ú/ig, 'u');
    Cliente.find({nombre: {$regex: metaTerm, $options: 'i'}}, (err, clientes) => {
        if(err) {
            return res.status(500).json({
                message: 'Dabase error'
            })
        }
        res.status(200).json({
            message: 'ok',
            clientes
        })
    })
})

app.get('/:_id', (req, res) => {
    if(!req.params._id) {
        return res.status(400).json({
            message: '_id param mandatory'
        })
    }
    Cliente.findOne({_id: req.params._id}, (err, cliente) => {
        if(err) {
            return res.status(500).json({
                message: 'Dabase error'
            })
        }
        res.status(200).json({
            message: 'ok',
            cliente
        })
    })
})


app.post('/', (req, res) => {
    if(!req.body.nombre) {
        return res.status(400).json({
            message: 'nombre mandatory'
        })
    }
    const cliente = new Cliente({
        nombre: req.body.nombre,
        actividades: req.body.actividades || '',
        direccion: req.body.direccion || '',
        localidad: req.body.localidad || '',
    })
    cliente.save({}, (err, cliente) => {
        if(err) {
            return res.status(500).json({
                message: 'Dabase error'
            })
        }
        res.status(200).json({
            message: 'ok',
            cliente
        })
    })
})

app.put('/:_id', (req, res) => {
    if(!req.params._id) {
        return res.status(400).json({
            message: '_id param mandatory'
        })
    }
    Cliente.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, cliente) => {
        if(err) {
            return res.status(500).json({
                message: 'Dabase error'
            })
        }
        res.status(200).json({
            message: 'ok',
            cliente
        })
    })
})

app.delete('/:_id', (req, res) => {
    if(!req.params._id) {
        return res.status(400).json({
            message: '_id param mandatory'
        })
    }
    Cliente.deleteOne({_id: req.params._id}, (err, infoDeleted) => {
        if(err) {
            return res.status(500).json({
                message: 'Dabase error'
            })
        }
        res.status(200).json({
            message: 'ok',
            info: infoDeleted
        })
    })
})

module.exports = app;
