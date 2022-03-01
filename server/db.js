const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/biblioteca')
    .then(()=>{console.log('Base de datos conectada')})
    .catch((e)=>{console.log(e)})