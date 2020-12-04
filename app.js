'use strict'

const express = require("express");
const body_parser = require("body-parser");
const config = require("./config");
const port = config.port;
const path = require("path");
const multer = require("multer");
const File = require("./models/file");

var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

let storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb) =>{
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
app.post('/files',upload.array('files'), (req,res) => {
    try{
        for (let i = 0; i < req.files.length; i++) {
            let file = new File({
                archivo: req.files[i].filename,
                author: "Emanuel Pinaud",
                peso: req.files[i].size,
                extension: req.files[i].filename.split(".")[1]
            });
            file.save((err,data) => {
                if(err) res.status(500).send({ message:`Error al crear el Archivo ${err}`});
            }); 
        }
       
        return res.status(200).send(req.files) ;

    }catch(error){
        return res.status(409).send({ message:`Error ${error}` });
    }
});

app.get('/readAll', (req,res) => {
    try{
        File.find({},(err,data) => {
            if(err) return res.status(500).send({message:"Error al listar los archivos"});
            if(!data) return res.status(404).send({message:"No se encontraron datos"});
            res.status(200).send({
                data
            });
        });
    }catch(error){
        return res.status(409).send({ message:`Error ${error}` });
    }
});

module.exports = app;