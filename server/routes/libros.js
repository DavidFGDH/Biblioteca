const express = require('express');
const router = express.Router();
const RequestAuth = require('../middleware/RequestAuth')
const LibrosDB = require('../models/libros')
const {body} = require("express-validator");
const RequestValid = require('../middleware/RequestValid')
const appRoot = require('app-root-path');
const Fs = require("fs");

router.post('/crear',
    RequestAuth,
    body('Titulo').isLength({min:3}).isString(),
    body('Autor').isLength({min:4}).isString(),
    body('PrintISBN').isNumeric().isLength({min:5}),
    body('EISBN').isNumeric().isLength({min:5}),
    body('Editorial').isLength({min:3}).isString(),
    body('Edicion').isString(),
    body('Volumen').isNumeric(),
    body('Idioma').isString(),
    body('NumPaginas').isNumeric(),
    body('Materia').isString(),
    RequestValid,
    (req,res)=>{
        LibrosDB.create(
            {
                Titulo:req.body.Titulo,
                Autor:req.body.Autor,
                PrintISBN:req.body.PrintISBN,
                EISBN:req.body.EISBN,
                Editorial:req.body.Editorial,
                Edicion:req.body.Edicion,
                Volumen:req.body.Volumen,
                Idioma:req.body.Idioma,
                NumPaginas:req.body.NumPaginas,
                Materia:req.body.Materia,
            }
        ,(err,doc)=>{
                if(err)
                    return res.status(500).send(err)
                return res.send({msg:"Libro añadido",doc})
            })
    })

router.get('/todos',
    RequestAuth,
    (req,res)=>{
        LibrosDB.find({},(err,doc)=>{
            if(err)
                return res.status(500).send(err)
            return res.send(doc)
        })
})

router.put('/actualizar',
    RequestAuth,
    body('idLibro').isMongoId(),
    body('Autor').isLength({min:4}).isString(),
    body('PrintISBN').isNumeric().isLength({min:5}),
    body('EISBN').isNumeric().isLength({min:5}),
    body('Editorial').isLength({min:3}).isString(),
    body('Edicion').isString(),
    body('Volumen').isNumeric(),
    body('Idioma').isString(),
    body('NumPaginas').isNumeric(),
    body('Materia').isString(),
    body('Titulo').isString(),
    RequestValid,
    (req,res)=>{
        LibrosDB.findOneAndUpdate({_id:req.body.idLibro},{
            Titulo:req.body.Titulo,
            Autor:req.body.Autor,
            PrintISBN:req.body.PrintISBN,
            EISBN:req.body.EISBN,
            Editorial:req.body.Editorial,
            Edicion:req.body.Edicion,
            Volumen:req.body.Volumen,
            Idioma:req.body.Idioma,
            NumPaginas:req.body.NumPaginas,
            Materia:req.body.Materia,
        },(err,doc)=>{
            if(!doc){
                return res.status(404).send({msg:"Libro no encontrado"})
            }
            if(err)
                return res.status(500).send(err)
            return res.send({msg:"Libro Actualizado",doc})
        })
})


router.delete('/libro',
    RequestAuth,
    body('idLibro').isMongoId(),
    RequestValid,
    (req,res)=>{
        LibrosDB.findByIdAndRemove({
            _id:req.body.idLibro,
        },(err,doc)=>{
            if(!doc){
                return res.status(404).send({msg:"Libro no encontrado"})
            }
            if(err)
                return res.status(500).send(err)
            return res.send({msg:"Libro Eliminado"})
        })

})

router.get('/:id',RequestAuth,
    (req,res)=>{
        LibrosDB.findById(req.params.id,(err,doc)=>{
            if(err)
                return res.status(500).send(err)
            if(doc===null){
                return  res.status(404).send({msg:'libro no encontrado'})
            }
            return  res.send(doc)
        })
    })

router.post('/img/:id',
    RequestAuth,
    (req,res)=>{
        if (!req.files || Object.keys(req.files).length !==1) {
            return res.status(400).send({msg:'Documento no cargados'});
        }

            LibrosDB.findById(req.params.id,(err,doc)=>{
                console.log(doc)
                if(err)
                    return res.status(500).send(err)
                if(doc){
                    let imgLibro = req.files.ImgLibro;
                    let  uploadPath =  appRoot+ '/upload/libros/img/' + doc._id+'.png';
                    try {
                        imgLibro.mv(uploadPath, (err) => {
                            if (err)
                                return res.status(500).send(err);
                            doc.Imagen = true
                            doc.save((err) => {
                                if (err)
                                    return res.status(500).send(err);
                                res.send({msg: 'Imagen Cargada'});
                            })
                        })
                    }catch (e) {
                        return res.status(500).send(e)
                    }
                }
            })
})



router.post('/pdf/:id',
    RequestAuth,
    (req,res)=>{
        if (!req.files || Object.keys(req.files).length !==1) {
            return res.status(400).send({msg:'Documento no cargados'});
        }
        LibrosDB.findById(req.params.id,(err,doc)=>{
            if(err)
                return res.status(500).send(err)
            if(doc){
                let Pdflibro = req.files.Pdflibro;
                let  uploadPath =  appRoot+ '/upload/libros/pdf/' + doc._id+'.pdf';
                try {
                    Pdflibro.mv(uploadPath, (err) => {
                        if (err)
                            return res.status(500).send(err);
                        doc.PDF = true
                        doc.save((err) => {
                            if (err)
                                return res.status(500).send(err);
                            res.send({msg: 'Archivo Cargado'});
                        })
                    })
                }catch (e) {
                    return res.status(500).send(e)
                }
            }
        })
    })



router.get('/img/:id',(req,res)=>{
    console.log(req.params.id)
    try{
        LibrosDB.findOne({_id:req.params.id},(err,doc)=>{
            console.log(doc)
            if(doc===undefined){
                return res.status(404).send({error:'not found'})
            }
            else{
                console.log(appRoot+'/upload/libros/img/'+doc._id+'.png')
                if(Fs.existsSync(appRoot+'/upload/libros/img/'+doc._id+'.png')){
                    return res.sendFile(appRoot+'/upload/libros/img/'+doc._id+'.png')
                }else{
                    return res.sendFile(appRoot+'/upload/libros/img/libro.svg')
                }
            }
        })

    }
    catch (e) {
        return res.send(e)
    }
})

router.get('/pdf/:id',(req,res)=>{
    console.log(req.params.id)
    try{
        LibrosDB.findOne({_id:req.params.id},(err,doc)=>{
            console.log(doc)
            if(doc===undefined){
                return res.status(404).send({error:'not found'})
            }
            else{
                if(Fs.existsSync(appRoot+'/upload/libros/pdf/'+doc._id+'.pdf')){
                    return res.sendFile(appRoot+'/upload/libros/pdf/'+doc._id+'.pdf')
                }else{
                    return  res.status(404).send({msg:'archivo no encontrado'})
                }
            }
        })

    }
    catch (e) {
        return res.send(e)
    }
})



module.exports = router;
