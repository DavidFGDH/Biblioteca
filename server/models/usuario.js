const mongoose = require('mongoose')
const { Schema } = mongoose;

const Usuario = new Schema({
    "Nombre":{type:String,require:true},
    "Apellidos":{type:String,require:true},
    "Correo":{type:String,require:true},
    "Password":{type:String,require:true},

})

mongoose.model('Usuario', Usuario)

module.exports = mongoose.model('Usuario')