'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema =new Schema({
    archivo:{type: String, required: true},
    fec_crea: {type: Date, default : Date.now()},
    author: {type:String, required:true},
    peso: { type: String, required: true},
    extension: {type:String, required:true}
});

module.exports = mongoose.model("File",FileSchema);