const outflowModel = require("../models/outflowModel")
const constants = require("../constants")

async function addOutflow(req,res){
    try {
        let exist = await outflowModel.getOutflowdById(req.body.id);
        console.log(req.body);
        if(exist){
            let data = {
                Message: 'El outflow ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        console.log(req.body);
        await outflowModel.addOutflow({
            amount: req.body.amount,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            description: req.body.description,
            idType: req.body.idType,
            idUser: req.body.idUser

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
//FUNCIONES PARA GRAFICOS.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getBiggerOutflowsInLastDaysM(req,res){
    try {
        console.log("body:");
        console.log(req.body);
        console.log("array devuelto de incomes para graficos:");
        let outflows = await outflowModel.getBiggerOutflowsInLastDays(req.body.id,req.body.limiter,req.body.days);
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
        let outflows = await outflowModel.getOutflowsByIdAndDate(req.body.id,req.body.startDate,req.body.days);
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
async function getOutflowsAmountByDate(req,res){
    try {
        console.log("body:");
        console.log(req.body);
        console.log("array devuelto de outflows:");
        let outflows = await outflowModel.getOutflowsAmountInLastDays(req.body.id,req.body.startDate,req.body.days);
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
module.exports = {addOutflow,getOutflowsByDate,getBiggerOutflowsInLastDaysM,getOutflowsAmountByDate}
/*
{
    "amount": "1500.50", "startDate": "2000-02-30", "endDate": null, "status": 1, "description":"se lo debo al csm del taquero", "idType": 1, "idUser": 1
}
*/