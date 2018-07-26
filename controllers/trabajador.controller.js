const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _trabajador;

const getAll = (req, res) => {
    _trabajador.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'trabajadores', res));
};

const createTrabajador = (req, res) => {
    const trabajador = req.body;
    var rfc = trabajador["rfc"] + "";
    console.log(rfc);
    var ftd = rfc.substring(8, 10);
    var ftm = rfc.substring(6, 8);
    var fta = rfc.substring(4, 6);
    if (rfc.substring(6, 7) == "0") {
        ftm = rfc.substring(7, 8);
    }
    if (rfc.substring(4, 6) > "18") {
        fta = "19" + fta;
    } else {
        fta = "20" + fta;
    }
    console.log(ftd + "/" + ftm + "/" + fta);
    var f = new Date();
    var factuald = f.getDate();
    var factualm = f.getMonth() + 1;
    if (factualm < 10) {
        factualm = "0" + factualm;
    }
    var factuala = f.getFullYear();
    var edad = factuala - fta;
    console.log(factuald + "/" + factualm + "/" + factuala);
    console.log(edad);
    if (edad >= 18) {
        _trabajador.create(trabajador)
            .then(
                (data) => {
                    res.status(200);
                    res.json({ msg: "Trabajador creado correctamente", data: data });
                }
            )
            .catch(
                (err) => {
                    res.status(400);
                    res.json({ msg: "Algo va mal!!!", data: err });
                }
            )
    } else {
        res.json({ msg: "El trabajador es menor de edad" });
    }
};

const getByFecha = (req, res) => {
    const {date,month,year} = req.params;
    /*if(month.substring(1,2) == "0"){
        month = month.substring(2,3);
    }
    var fecha = new Date(year,month,'0');
    if((date-0)>(fecha.getDate()-0)){
        console.log("Valida");    
    }else{
        console.log("No valida");
    }*/
    var edad = year - 40;
    _trabajador.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'trabajadores', res));
    
};

module.exports = (Trabajador) => {
    _trabajador = Trabajador;
    return ({
        getByFecha,
        getAll,
        createTrabajador
    });
}