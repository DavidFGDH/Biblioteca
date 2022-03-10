const mongoose = require('mongoose')
const { Schema } = mongoose;

const Libro = new Schema({
    Titulo:{type: String},
    Autor:{type:String},
    PrintISBN:{type:Number},
    EISBN:{type:Number},
    Editorial:{type:String},
    Edicion:{type:String},
    Volumen:{type:Number},
    Idioma:{type:String},
    NumPaginas:{type:Number},
    Materia:{type:String},
    Imagen:{type:Boolean},
    PDF:{type:Boolean},
})

mongoose.model('Libros', Libro)

module.exports = mongoose.model('Libros')