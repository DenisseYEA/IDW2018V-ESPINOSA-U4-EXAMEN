const mongoose = require('mongoose');


let trabajadorSchema = new mongoose.Schema({
  rfc:{
    type: String,
    required: true,
    unique: true,
    match: /^([A-ZÑ&]{4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
    uppercase: true
},
apellidos:{
    type: String,
    required: true,
    uppercase: true
},
nombre:{
    type: String,
    required: true,
    uppercase: true
}
});

const trabajadorModel = mongoose.model('TrabajadorSchema', trabajadorSchema, 'trabajadores');



module.exports = trabajadorModel;