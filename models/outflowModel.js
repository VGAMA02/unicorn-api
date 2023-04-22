const conexion = require('../connection')

function addOutflow({amount,startDate,endDate,status,description,idType,idUser}){
    let query = `INSERT INTO outflow (amount,startDate,endDate,status,description,idType,idUser) values (?,?,?,?,?,?,?);`
    return conexion.runQuery(query,[amount,startDate,endDate,status,description,idType,idUser]);
}
////Funciones Para graficos
function getBiggerOutflowsInLastDays(id,limit,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    console.log(myDate);
    let query = `SELECT amount,description FROM scheduledinput WHERE idTypeInput = 2 AND idUser = ? AND status = 1 AND NOT (ISNULL(endDate) or endDate =  '0000-00-00') AND endDate >= ? ORDER BY amount DESC LIMIT ?`
    return conexion.runQuery(query,[id,myDate,limit]);
}
function getOutflowsByIdAndDate(idUser,startDate,days){
    //Reducir el tiempo en dias
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    startDate.toString();
    let query = `SELECT amount,description FROM scheduledinput WHERE idUser = ? AND idType = 1 AND idTypeInput = 2 AND status = 1 AND NOT (ISNULL(endDate) or endDate =  '0000-00-00') AND endDate >= ? AND endDate <= ? ;`;
    //console.log(query);
    return conexion.runQuery(query,[idUser,myDate,startDate]);
}
////////////////////////////////////////////////////////////////////
function getOutflowsAmountInLastDays(id,startDate,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    startDate.toString();
    console.log("Rest date: " + myDate);
    console.log("start date: " + startDate);
    //(SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = 4 and idTypeInput = 2 and NOT (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= '2022-05-17' ) AS 'IngresosUnicos')
    let query = `(SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = ? and idTypeInput = 2 and NOT (ISNULL(endDate) or endDate = '0000-00-00') AND endDate >= ?  AND endDate <= ?) AS 'GastosUnicos');`;
    return conexion.runQueryRow(query,[id,myDate,startDate]);
}
module.exports = {addOutflow,getOutflowsByIdAndDate,getBiggerOutflowsInLastDays,getOutflowsAmountInLastDays} 