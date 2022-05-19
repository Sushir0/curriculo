const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')
    


router.get('/registro', (req, res)=>{
    res.render('usuarios/registro')
})

router.post('/registro', (req, res)=>{
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválido"})
    }
    if(req.body.senha.lenght < 4){
        erros.push({texto: "Senha muito curta"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas não correspondem"})
    }
    if(erros.length>0){
        res.render('usuarios/registro', {erros: erros})
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash("error_msg", "já existe uma conta com esse email")
                res.redirect('/usuarios/registro')
            }else{
                var novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash("error_msg", "houve um erro no salvamento")
                            res.redirect('/')
                        }else{
                            novoUsuario.senha = hash

                            novoUsuario.save().then(()=>{
                                
                                req.flash("success_msg", "cadastro efetuado com sucesso")
                                res.redirect('/')
                            }).catch((erro)=>{
                                req.flash("error_msg", "houve um erro no salvamento")
                                res.redirect('/')
                            })
                        }
                    })
                })
            }
        }).catch((erro)=>{
            req.flash("error_msg", "houve um erro interno")
            res.redirect('/')
        })   
    }
})

router.get('/registro/adm/sdfgdfghdfhjrtyjhdxfghytejgdtrjdfgjhtyj', (req, res)=>{
    res.render('usuarios/registro_adm')
})

router.post('/registro/adm/sdfgdfghdfhjrtyjhdxfghytejgdtrjdfgjhtyj', (req, res)=>{
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválido"})
    }
    if(req.body.senha.lenght < 4){
        erros.push({texto: "Senha muito curta"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas não correspondem"})
    }
    if(erros.length>0){
        res.render('usuarios/registro_adm', {erros: erros})
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash("error_msg", "já existe uma conta com esse email")
                res.redirect('/usuarios/registro/sdfgdfghdfhjrtyjhdxfghytejgdtrjdfgjhtyj')
            }else{
                var novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    eAdmin: 1
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash("error_msg", "houve um erro no salvamento")
                            res.redirect('/')
                        }else{
                            novoUsuario.senha = hash

                            novoUsuario.save().then(()=>{
                                
                                req.flash("success_msg", "cadastro efetuado com sucesso")
                                res.redirect('/')
                            }).catch((erro)=>{
                                req.flash("error_msg", "houve um erro no salvamento")
                                res.redirect('/')
                            })
                        }
                    })
                })
            }
        }).catch((erro)=>{
            req.flash("error_msg", "houve um erro interno")
            res.redirect('/')
        })   
    }
})



router.get('/login', (req, res)=>{
    res.render('usuarios/login')
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('success_msg', "deslogado com sucesso!!!")
    res.redirect('/')

})




module.exports = router