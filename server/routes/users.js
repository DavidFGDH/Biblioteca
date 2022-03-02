const express = require('express');
const router = express.Router();
const UsuarioDB = require('./../models/usuario')
const {body} = require("express-validator");
const bcrypt = require('bcryptjs');
const RequestValid = require('../middleware/RequestValid')
const jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/crear',
    body('Nombre').isLength({min:3}),
    body('Apellido').isLength({min:3}),
    body('Correo').isEmail(),
    body('Password').isStrongPassword(),
    RequestValid,
    (req,res)=>{
        let hashedPassword = bcrypt.hashSync(req.body.Password, 8)
        UsuarioDB.create({
        "Nombre":req.body.Nombre,
        "Apellido":req.body.Apellido,
        "Correo":req.body.Correo.toLowerCase(),
        "Password":hashedPassword
      },(err,doc)=>{
        if(err)
          return res.status(500).send(err)
        return res.send({msg:"Usuario Creado"})
      })

})


router.post('/login',
    body('Correo').isEmail(),
    body('Password').isStrongPassword(),
    RequestValid,
    (req,res)=>{
       console.log(req.body.Correo)
        UsuarioDB.find({
            "Correo":req.body.Correo.toLowerCase()
        },(err,doc)=>{
            console.log(doc.length)
            if(err)
                return res.status(500).send(err)
            if(doc.length===1){
                bcrypt.compare(req.body.Password, doc[0].Password,(err,result)=>{
                    if(err){
                        return res.status(500).send(err)
                    }
                    if(result){
                        const token =  jwt.sign({
                            "id":doc[0]._id
                        },'cfsaujhfdauhdhvduhtr854bf54gbf54ht54')
                        return res.send({token:token})

                    }else{
                        return  res.status(401).send({msg:"Contraseña Incorrecta"})
                    }
                })

            }else {
                return  res.status(404).send({
                    msg:"Usuario no encontrado"
                })
            }
        })
    })

module.exports = router;
