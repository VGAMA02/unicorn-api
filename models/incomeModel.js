const conexion = require('../connection')

function addIncome({amount,date,status,description,idType,idUser}){
    let query = `INSERT INTO income (amount,date,status,description,idType,idUser) values (?,?,?,?,?,?);`
    return conexion.runQuery(query,[amount,date,status,description,idType,idUser]);
}
////Funciones Para graficos
function getBiggerIncomesInLastDays(id,limit,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    let query = `SELECT amount,description FROM scheduledinput WHERE idTypeInput = 1 AND idUser = ? AND status = 1 AND NOT (ISNULL(endDate) or endDate =  '0000-00-00') AND endDate >= ? ORDER BY amount DESC LIMIT ?`
    return conexion.runQuery(query,[id,myDate,limit]);
}
/////////////////////////////////////////////////////////////////////
function getIncomesByIdAndDate(idUser,startDate,days){ //Funcion para grafico de frecuencias, 
    //Reducir el tiempo en dias
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    startDate.toString();
    let query = `SELECT amount,description FROM scheduledinput WHERE idUser = ? AND idType = 1 AND status = 1 AND  idTypeInput = 1 AND NOT (ISNULL(endDate) or endDate =  '0000-00-00') AND endDate >= ? AND endDate <= ? ;`;
    return conexion.runQuery(query,[idUser,myDate,startDate]);
}
////////////////////////////////////////////////////////////////////
function getIncomesAmountInLastDays(id,startDate,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    startDate.toString();
    console.log("Rest date: " + myDate);
    console.log("start date: " + startDate);
    //(SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = 4 and idTypeInput = 2 and NOT (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= '2022-05-17' ) AS 'IngresosUnicos')
    let query = `(SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = ? and idTypeInput = 1 and NOT (ISNULL(endDate) or endDate = '0000-00-00') AND endDate >= ?  AND endDate <= ?) AS 'IngresosUnicos');`;
    return conexion.runQueryRow(query,[id,myDate,startDate]);
}

module.exports = {addIncome,getBiggerIncomesInLastDays,getIncomesByIdAndDate,getIncomesAmountInLastDays} 