'use strict'

const app = require("./app");

const mongoose = require("mongoose");
const config = require("./config");
const port = config.port;

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Mongo DB Conectado")
  app.listen(port,() =>{
    console.log("Servidor corriendo correctamente en el puerto localhost:"+port);
  });
})
.catch(err => console.log(err))