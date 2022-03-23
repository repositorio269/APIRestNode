const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8080;

app.use(cors());

const mongoURI = 'mongodb+srv://apitest:testapi@cluster0.dznjg.mongodb.net/erp?retryWrites=true&w=majority'; 
const options = {
    useNewUrlParser: true
}

mongoose.connect(mongoURI, options)
        .then(() => console.log('Conectado a la base de datos'))
        .catch(err => console.log(err))

const clientes = require('./routes/clientes');

app.use(express.json());

app.use('/clientes', clientes);
app.use('/*', (req, res) => {
    res.status(404).json({
        message: 'Incorrect route or params',
    })
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})