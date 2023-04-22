
const automaticModel = require("../models/automationModel");
const constants = require("../constants");
//cron.schedule('0 0 * * * *', () => { ejecutarse todos los dias a las 12 AM
//var task = cron.schedule('1 * * * * *', () => { ejecucion cada minuto.
// = cron.schedule('* * * * * *', () => { ejecucion cada segundo
///PROCESO DE ACTUALIZACION
var cron = require('node-cron');
var task = cron.schedule('1 * 1 * * *', () => {
  UpdateDataBaseSchedules();
  console.log('running a task every minute');
});


///
async function UpdateDataBaseSchedulesStop(req,res){
    try {
            task.stop();
            res.send("StopOK");        
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
///
async function UpdateDataBaseSchedulesStart(req,res){
    try {
            task.start();
            res.send("StartOK");        
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
///
async function UpdateDataBaseSchedules(req,res){
    try {
        //En este caso vamos a traer funcion por funcion.
        let fails = "";
        ///Singles
        console.log("scheduleSingles  -->");
        let scheduleSingles = await automaticModel.UpdateSchedulesDataBaseSingles();
        console.log(scheduleSingles);
        if(!scheduleSingles){ fails += "Falla en actualizar schedules unicos.\n" }
        ///Semanales
        console.log("scheduleSemanales  -->");
        let scheduleSemanales = await automaticModel.UpdateSchedulesDataBaseSemanales();
        console.log(scheduleSemanales);
        if(!scheduleSemanales){ fails += "Falla en actualizar schedules Semanales.\n" }
        ///Quincenales
        console.log("scheduleQuincenales  -->");
        let scheduleQuincenales = await automaticModel.UpdateSchedulesDataBaseQuincenales();
        console.log(scheduleSingles);
        if(!scheduleQuincenales){ fails += "Falla en actualizar schedules quincenales.\n" }
        ///Mensuales
        console.log("scheduleMensuales  -->");
        let scheduleMensuales = await automaticModel.UpdateSchedulesDataBaseMensuales();
        console.log(scheduleMensuales);
        if(!scheduleMensuales){ fails += "Falla en actualizar schedules Mensuales.\n" }
        ///Anuales
        console.log("scheduleAnuales  -->");
        let scheduleAnuales = await automaticModel.UpdateSchedulesDataBaseAnuales();
        console.log(scheduleAnuales);
        if(!scheduleAnuales){ fails += "Falla en actualizar schedules Mensuales.\n" }

        if(fails != ""){
            console.log(fails);
        }
        else{
            console.log("Todas las actualizaciones se realizaron con exito");
        }         
    }catch (ex) {
        console.log(ex);
        return
    }
}


module.exports = {UpdateDataBaseSchedules,UpdateDataBaseSchedulesStop,UpdateDataBaseSchedulesStart}