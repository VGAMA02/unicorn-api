const scheduledModel = require("../models/scheduledModel")
const constants = require("../constants")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function addScheduled(req,res){
    try {
        let exist = await scheduledModel.getScheduledById(req.body.id);
        if(exist){
            let data = {
                Message: 'El id ya existe intente de nuevo',
                status: false
            }
            res.send(data);
            return
        }
        console.log(req.body);
        await scheduledModel.addScheduled({
            idTypeInput: req.body.idTypeInput,
            amount: req.body.amount,
            description: req.body.description,
            idType: req.body.idType,
            idUser: req.body.idUser,
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            lastUpdate: req.body.lastUpdate
        });
        let data = {
            status: true
        }
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function changeScheduled(req,res){
    try {
        console.log('Entrando a edicion');
        let status = await scheduledModel.updateScheduled(req.body.idSheduledInput,req.body.idTypeInput,req.body.amount,req.body.description,req.body.idType,req.body.idUser,req.body.startDate);
        console.log(status);
        if(!status){
            let data = {
                Message: 'El id no existe intente de nuevo',
                status: false
            }
            res.send(data);
            return
        }else{
            console.log("Scheduled Modificado")
            let data = {
                status: true
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function changeScheduledStatus(req,res){
    try {
        let status = await scheduledModel.changeScheduledStatus(req.body.id,req.body.idScheduled);
        console.log(status);
        if(status){
            let data = {
                Message: 'El id no existe intente de nuevo',
                status: false
            }
            res.send(data);
            return
        }else{
            console.log("Scheduled Eliminado")
            let data = {
                status: true
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getIncomesByDate(req,res){
    try {
        console.log("body:");
        console.log(req.body);
        console.log("array devuelto:");
        let incomes = await scheduledModel.getIncomesByIdAndDate(req.body.id,req.body.startDate,req.body.days);
        console.log(incomes);
        if(!incomes){
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
                incomes
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getIncomesByIdUser(req,res){
    try {
        console.log("body:");
        console.log(req.body);
        console.log("array devuelto de incomes:");
        let incomes = await scheduledModel.getIncomesByUserId(req.body.id);
        console.log(incomes);
        if(!incomes){
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
                incomes
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getOutflowsByIdUser(req,res){
    try {
        console.log("body:");
        console.log(req.body);
        console.log("array devuelto de OUTFLOWS:");
        let outflows = await scheduledModel.getOutflowsByUserId(req.body.id);
        console.log(outflows);
        if(!outflows){
            let data = {
                Message: 'No se en contraron outflows en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
           
            let data = {
                status: true,
                outflows
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getOutflowsByDate(req,res){
    try {
        let outflows = await scheduledModel.getOutflowsByIdAndDate(req.body.id,req.body.startDate,req.body.days);
        console.log(outflows);
        if(!outflows){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            console.log("----------------------------------------------------");
            //console.log(req.body);
            let data = {
                status: true,
                outflows
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getScheduledByIdScheduledIdUser(req,res){
    try {
        let scheduled = await scheduledModel.getScheduledById(req.body.idScheduled,req.body.idUser);
        //console.log(status);
        if(!scheduled){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            //console.log(req.body);
            let data = {
                status: true,
                scheduled
            }
            console.log('Mandando--------------------------');
            console.log(data);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getSchedulesByDate(req,res){
    try {
        let schedules = await scheduledModel.getSchedulesByUserIdAndDate(req.body.id,req.body.startDate,req.body.days);
        //console.log(status);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            //console.log(req.body);
            let data = {
                status: true,
                schedules
            }
            console.log('Mandando--------------------------');
            console.log(data);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getAllSchedules(req,res){
    try {
        let schedules = await scheduledModel.getSchedulesByUserId(req.body.id);
        //console.log(status);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            //console.log(req.body);
            let data = {
                status: true,
                schedules
            }
            console.log('Mandando--------------------------');
            console.log(data);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getSchedulesByIdOptions(req,res){
    console.log("variables de opciones: " + req.body);
        let schedules;
    try {
        if(req.body.option == 1){
            schedules = await scheduledModel.getSchedulesByUserId(req.body.id);
        }
        else  if(req.body.option == 2){
            schedules = await scheduledModel.getSchedulesIncomesByUserId(req.body.id);
        }
        else  if(req.body.option == 3){
            schedules = await scheduledModel.getSchedulesOutflowsByUserId(req.body.id);
        }
        else{
        }
        //console.log(status);
        if(!schedules){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            //console.log(req.body);
            let data = {
                status: true,
                schedules
            }
            console.log('Mandando--------------------------');
            console.log(data);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getSaldoActual(req,res){ 
    try {
        console.log("calculando saldo actual");
        console.log(req.body.id);
        let saldoE = await scheduledModel.getSaldoActualById(req.body.id);
        console.log(saldoE);
        let saldo = JSON.parse(saldoE['saldoActual']);
        if(!saldoE){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            //console.log(req.body);
            let data = {
                status: true,
                saldo
            }
            console.log('Mandando--------------------------');
            console.log(data);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getSaldoFuturo(req,res){ 
    try {
        console.log("calculando saldo futuro");
        console.log("id:" + req.body.id + "  dias: " +  req.body.days);
        let saldoExist = await scheduledModel.getSaldoFuturoByIdAndDays(req.body.id,req.body.days);
        console.log(saldoExist);
        let saldo = JSON.parse(saldoExist['saldoFuturo']);
        if(!saldoExist){
            let data = {
                Message: 'No se en contraron incomes en estas fechas',
                status: false
            }
            res.send(data);
            return
        }
        else{
            //console.log(req.body);
            let data = {
                status: true,
                saldo
            }
            console.log('Mandando--------------------------');
            console.log(data);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {addScheduled,changeScheduled,changeScheduledStatus,getScheduledByIdScheduledIdUser,getIncomesByDate,getOutflowsByDate,getSchedulesByDate,getAllSchedules,getSaldoActual,getSaldoFuturo,
    getIncomesByIdUser, getOutflowsByIdUser, getSchedulesByIdOptions}
/*
{
    "idTypeInput": "0", "amount": 500.50, "descripcion": "dineros :)", "idType": 0, "idUser": 1, "status": 1, "startDate": "2022-02-10", "endDate": null
}
*/