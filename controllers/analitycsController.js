const analitycsModel = require("../models/analitycsModel");
const constants = require("../constants");

async function getSchedulesAnaliticsController(req,res){
    try {
        console.log(req.body);
        let schedules = await analitycsModel.getSchedulesAnaliticsByCategory(req.body.id,req.body.category);
        
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function getSchedulesAnaliticsLimiterController(req,res){
    try {
        console.log(req.body);
        let schedules = await analitycsModel.getSchedulesAnaliticsByCategoryLimiter(req.body.id,req.body.category,req.body.limiter,req.body.opcion);
        
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function getSchedulesTransportController(req,res){
    try {
        console.log(req.body);
        let schedules = await analitycsModel.getSchedulesAdviceTransport(req.body.id);
        
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function getSchedulesWorkController(req,res){
    try {
        console.log(req.body);
        let schedules = await analitycsModel.getSchedulesAdviceWork(req.body.id);
        
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

//ACTUALIZAR TODAS LAS INSERCIONES DEL USUARIO CON CATEGORIA.
async function updateSchedulesDiversionController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesDiversion(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function updateSchedulesHigieneController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesHigiene(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
async function updateSchedulesHigieneController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesHigiene(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
async function updateSchedulesRopaController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesrRopa(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function updateSchedulesTransporteController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesTransporte(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function updateSchedulesCasaController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesCasa(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function updateSchedulesCuentasPagosController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesCuentasPagos(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function updateSchedulesAlimentacionController(req,res){
    try {
        console.log(req.body.id);
        let schedules = await analitycsModel.updateSchedulesAlimentacion(req.body.id);
        console.log(schedules);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            let data = {
                status: true,
                schedules
            }
            res.send(data);
        }        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}


async function okController(req,res){
    try {
        console.log(req.body);
        let data = await analitycsModel.getOK();
        res.send(data);
               
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

module.exports = {updateSchedulesDiversionController,getSchedulesAnaliticsController,getSchedulesAnaliticsLimiterController,getSchedulesTransportController,getSchedulesWorkController,okController
,updateSchedulesHigieneController,updateSchedulesRopaController,updateSchedulesTransporteController,updateSchedulesCasaController,updateSchedulesCuentasPagosController,updateSchedulesAlimentacionController}