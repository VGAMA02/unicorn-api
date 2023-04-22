const conexion = require('../connection')

function addScheduled({idTypeInput,amount,description,idType,idUser,status,startDate,endDate,lastUpdate}){
    let query = `INSERT INTO scheduledinput (idTypeInput,amount,description,idType,idUser,status,startDate,endDate,lastUpdate) values (?,?,?,?,?,?,?,?,?);`
    return conexion.runQuery(query,[idTypeInput,amount,description,idType,idUser,status,startDate,endDate,lastUpdate]);
}
function getStatusScheduledById(id){
    let query = `SELECT status FROM scheduledinput WHERE idSheduledInput = ?;`
    return conexion.runQueryRow(query,[id]);
}
////////////////////////////////////////////////////////////////Obtener Movimientos
function getIncomesByUserId(id){ //Obtener todos los registrados de un usuario tanto ingresos como egresos
    let query = `SELECT * FROM scheduledinput WHERE idType = 1 AND idTypeInput = 1 AND idUser = ? AND status = 1 AND NOT (ISNULL(endDate) or endDate = '0000-00-00');`
    return conexion.runQuery(query,[id]);
}
function getIncomesByUserIdLimiter(id,limiter){ //Obtener los  ingresos de un usuario lmitados
    let query = `SELECT * FROM scheduledinput WHERE idType = 1 AND idTypeInput = 1 AND idUser = ? AND status = 1 AND NOT (ISNULL(endDate) or endDate = '0000-00-00') ORDER BY StartDate DESC limit ?;`
    return conexion.runQuery(query,[id,limiter]);
}
function getOutflowsByUserId(id){ //Obtener todos los registrados de un usuario tanto ingresos como egresos
    let query = `SELECT * FROM scheduledinput WHERE idType = 1 AND idTypeInput = 2 AND idUser = ? AND status = 1 AND NOT (ISNULL(endDate) or endDate =  '0000-00-00');`
    return conexion.runQuery(query,[id]);
}
function getOutflowsByUserIdLimiter(id,limiter){ //Obtener todos los registrados de un usuario tanto ingresos como egresos
    let query = `SELECT * FROM scheduledinput WHERE idType = 1 AND idTypeInput = 2 AND idUser = ? AND status = 1 AND NOT (ISNULL(endDate) or endDate =  '0000-00-00') ORDER BY StartDate DESC limit ?;`
    return conexion.runQuery(query,[id,limiter]);
}


////////////////////////////////////////////////////////////////Obtener schedules
function getScheduledById(idScheduled,idUser){
    let query = `SELECT * FROM scheduledinput WHERE idSheduledInput = ? AND idUser = ?;`
    return conexion.runQueryRow(query,[idScheduled, idUser]);
}
function getSchedulesByUserIdAndDate(idUser,startDate,days){ //Obtener los programados en una fecha especifica
    //Reducir el tiempo en dias
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    startDate.toString();
    let query = `SELECT * FROM scheduledinput WHERE idUser = ? AND startDate >= ? AND startDate <= ?;`;
    //console.log(query);
    return conexion.runQuery(query,[idUser,myDate,startDate]);
}
function getSchedulesByUserId(id){ //Obtener todos los registrados de un usuario tanto ingresos como egresos
    let query = `SELECT * FROM scheduledinput WHERE idUser = ? AND status = 1 AND (ISNULL(endDate) or endDate = '0000-00-00');`
    return conexion.runQuery(query,[id]);
}
function getSchedulesIncomesByUserId(id){ //Obtener todos los registrados de un usuario tanto ingresos como egresos
    let query = `SELECT * FROM scheduledinput WHERE idTypeInput = 1 AND idUser = ? AND status = 1 AND (ISNULL(endDate) or endDate = '0000-00-00');`
    return conexion.runQuery(query,[id]);
}
function getSchedulesOutflowsByUserId(id){ //Obtener todos los registrados de un usuario tanto ingresos como egresos
    let query = `SELECT * FROM scheduledinput WHERE idTypeInput = 2 AND idUser = ? AND status = 1 AND (ISNULL(endDate) or endDate = '0000-00-00');`
    return conexion.runQuery(query,[id]);
}
/////////////////////////////////////////////////////////////////////Change - delete schedules
function updateScheduled(idSheduled,idTypeInput,amount,description,idType,idUser,startDate){
    console.log('editando scheduled:');
    var myDate = new Date(startDate);
    //myDate.setTime(myDate.getTime() + dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    //myDate.toString();
    //startDate.toString();
    console.log('mydate: ' + myDate);
    console.log('vars: ' + idSheduled + " ," + idTypeInput + " ," + amount + " ," + description + " ," + idType + " ,"  + idUser + " ," + startDate + " ," + myDate);
    let query = `UPDATE scheduledinput SET idTypeInput = ? , amount = ? , description = ? , idType = ?, startDate = ? WHERE idUser = ? AND idSheduledInput = ? `
    return conexion.runQuery(query,[idTypeInput,amount,description,idType,myDate,idUser,idSheduled]);
}
function changeScheduledStatus(id,idScheduled){ //agregar el endDay aqui.
    var endDate = new Date();
    //myDate.setTime(myDate.getTime() + dateOffset);
    var endDate = endDate.toISOString().slice(0, 10);
    endDate.toString();
    console.log(endDate);
    console.log('set endDate as: ' + endDate);
    let query = `UPDATE scheduledinput SET status = 0, endDate = ? WHERE idUser = ? AND idSheduledInput = ? `
    return conexion.runQueryRow(query,[endDate,id,idScheduled]);
}
//////////////////////////////////////////////////////////////////getschedules
function getSaldoActualById(id){
    let query = `SELECT
    (
    (SELECT IFNULL(SUM(amount),0) as 'ingresos' FROM scheduledinput WHERE idTypeInput = 1 AND idUser = ? AND endDate <= CURRENT_DATE AND NOT (ISNULL(endDate) or endDate = '0000-00-00') AND status = 1)
    -
    (SELECT IFNULL(SUM(amount),0) as 'egresos' FROM scheduledinput WHERE idTypeInput = 2 AND idUser = ? AND endDate <= CURRENT_DATE AND NOT (ISNULL(endDate) or endDate = '0000-00-00') AND status = 1)
    ) as 'saldoActual'`;
    return conexion.runQueryRow(query,[id,id]);
}
function getSaldoFuturoByIdAndDays(id,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() + dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    console.log(myDate);
    /*
    var semanas = Math.floor(days / 7);
    var quincenas = Math.floor(days / 15);
    var meses = Math.floor(days / 30);
    console.log(semanas,quincenas,meses)
    */
    let query = `SELECT(
        #query saldo actual
        (SELECT(
            (SELECT IFNULL(SUM(amount),0) as 'ingresos' FROM scheduledinput WHERE idType = 1 AND status = 1 AND idTypeInput = 1 AND idUser = ? AND endDate <= CURRENT_DATE)
            -
            (SELECT IFNULL(SUM(amount),0) as 'egresos' FROM scheduledinput WHERE idType = 1 AND status = 1 AND idTypeInput = 2 AND idUser = ? AND  endDate <= CURRENT_DATE)
            ) as 'saldoActual'
        )  
    +
          #query de unicos
        (SELECT(
            (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 1 and status = 1 AND idUser = ? and idTypeInput = 1 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ?) 
            -
            (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 1 and status = 1 AND idUser = ? and idTypeInput = 2 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ?) 
            ) as 'saldoUnicos'
        ) 
    +
        # query de semanales
        (SELECT(
            SELECT(
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 2 and status = 1 AND idUser = ? and idTypeInput = 1 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ?)
                -
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 2 and status = 1 AND idUser = ? and idTypeInput = 2 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ? ) 
                ) AS 'saldo semanal'
             ) *  IF(? <= 7,1,FLOOR(? / 7) ) AS 'saldoSemanal' #aplicar variable de division en vez de 2
        )
    +
      # query de quincenales
        (SELECT(
            SELECT(
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 3 and status = 1 AND idUser = ? and idTypeInput = 1 and (ISNULL(endDate) or endDate = '0000-00-00') AND lastUpdate <= ?)
                -
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 3 and status = 1 AND idUser = ? and idTypeInput = 2 and (ISNULL(endDate) or endDate = '0000-00-00') AND lastUpdate <= ? ) 
                ) AS 'saldo semanal'
             ) *  IF(? <= 15,1,FLOOR(? / 15) ) AS 'saldoSemanal' #aplicar variable de division en vez de 2
        )
     +
      # query de mensuales
        (SELECT(
            SELECT(
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 4 AND idTypeInput = 1 AND (ISNULL(endDate) or endDate = '0000-00-00') AND
                MONTH(lastUpdate) <= MONTH(?) AND status = 1 AND idUser = ? )
                -
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 4 AND idTypeInput = 2 AND (ISNULL(endDate) or endDate = '0000-00-00') AND 
                MONTH(lastUpdate) <= MONTH(?)  AND status = 1 AND idUser = ? )
                ) AS 'saldoMensual1'
            ) *  IF(? <= 30,1,FLOOR(? / 30) ) AS 'saldoSemanal' #aplicar variable de division en vez de 2
    
        )
    +
       # query de anuales
            (SELECT(
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 5 AND idTypeInput = 1 AND (ISNULL(endDate) or endDate = '0000-00-00') AND
                DAYOFYEAR(startDate) <= DAYOFYEAR(?)  AND status = 1 AND idUser = ? )
                -
                (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 5 AND idTypeInput = 2 AND (ISNULL(endDate) or endDate = '0000-00-00') AND 
                DAYOFYEAR(startDate) <= DAYOFYEAR(?) AND status = 1 AND idUser = ?)
                ) * IF(? <= 365,1,FLOOR(? / 365) ) AS 'saldoMensual'
        )
    ) as 'saldoFuturo'`;
    return conexion.runQueryRow(query,[id,id,id,myDate,id,myDate,id,myDate,id,myDate,days,days,id,myDate,id,myDate,days,days,myDate,id,myDate,id,days,days,myDate,id,myDate,id,days,days]);
}
function getIngresosFuturoByIdAndDays(id,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() + dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    console.log(myDate);
    let query = `
    SELECT(
       #query de unicos
       (SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = ? and idTypeInput = 1 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ? ) AS 'IngresosUnicos')
    +
        # query de semanales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 2 and status = 1 AND idUser = ? and idTypeInput = 1 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ?) * IF(? <= 7,1,FLOOR(? / 7) ) AS 'IngresosSemanales' ) 
    +
      # query de quincenales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 3 and status = 1 AND idUser = ? and idTypeInput = 1 and (ISNULL(endDate) or endDate = '0000-00-00') AND lastUpdate <= ?) * IF(? <= 15,1,FLOOR(? / 15) )  AS 'saldoSemanal') #aplicar variable de division en vez de 2
     +
      # query de mensuales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 4 AND idTypeInput = 1 AND (ISNULL(endDate) or endDate = '0000-00-00') AND idUser = ? AND MONTH(lastUpdate) <= MONTH(?) AND status = 1) * IF(? <= 30,1,FLOOR(? / 30) )  AS 'saldoMensual')
    +
       # query de anuales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 5 AND idTypeInput = 1 AND (ISNULL(endDate) or endDate = '0000-00-00') AND idUser = ? AND DAYOFYEAR(startDate) <= DAYOFYEAR(?)  AND status = 1)  * IF(? <= 365,1,FLOOR(? / 365) ) AS 'saldoAnual') #aplicar variable de division en vez de 2 AS 'saldoMensual'
    ) as 'ingresosFuturos'`;
    return conexion.runQueryRow(query,[id,myDate,id,myDate,days,days,id,myDate,days,days,id,myDate,days,days,id,myDate,days,days]);

}
function getEgresosFuturoByIdAndDays(id,days){
    var dateOffset = (24*60*60*1000) * days;
    var myDate = new Date();
    myDate.setTime(myDate.getTime() + dateOffset);
    var myDate = myDate.toISOString().slice(0, 10);
    myDate.toString();
    console.log(myDate);
    let query = `
    SELECT(
       #query de unicos
       (SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = ? and idTypeInput = 2 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ? ) AS 'IngresosUnicos')
    +
        # query de semanales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 2 and status = 1 AND idUser = ? and idTypeInput = 2 and (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= ?) * IF(? <= 7,1,FLOOR(? / 7) ) AS 'IngresosSemanales' ) 
    +
      # query de quincenales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 3 and status = 1 AND idUser = ? and idTypeInput = 2 and (ISNULL(endDate) or endDate = '0000-00-00') AND lastUpdate <= ?) * IF(? <= 15,1,FLOOR(? / 15) )  AS 'saldoSemanal') #aplicar variable de division en vez de 2
     +
      # query de mensuales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 4 AND idTypeInput = 2 AND (ISNULL(endDate) or endDate = '0000-00-00') AND idUser = ? AND MONTH(lastUpdate) <= MONTH(?) AND status = 1) * IF(? <= 30,1,FLOOR(? / 30) )  AS 'saldoMensual')
    +
       # query de anuales
       (SELECT (SELECT IFNULL(SUM(amount),0) from scheduledinput WHERE idType = 5 AND idTypeInput = 2 AND (ISNULL(endDate) or endDate = '0000-00-00') AND idUser = ? AND DAYOFYEAR(startDate) <= DAYOFYEAR(?)  AND status = 1)  * IF(? <= 365,1,FLOOR(? / 365) ) AS 'saldoAnual') #aplicar variable de division en vez de 2 AS 'saldoMensual'
    ) as 'egresosFuturos'`;
    return conexion.runQueryRow(query,[id,myDate,id,myDate,days,days,id,myDate,days,days,id,myDate,days,days,id,myDate,days,days]);

}




// (SELECT(SELECT IFNULL(SUM(amount),0)  from scheduledinput WHERE idType = 1 and status = 1 AND idUser = 4 and idTypeInput = 2 and NOT (ISNULL(endDate) or endDate = '0000-00-00') AND startDate <= '2022-05-17' ) AS 'IngresosUnicos')



module.exports = {addScheduled,getScheduledById,updateScheduled,changeScheduledStatus,getStatusScheduledById,getSchedulesByUserId,
    getSchedulesByUserIdAndDate,getSaldoActualById, getSaldoFuturoByIdAndDays,getIngresosFuturoByIdAndDays,getEgresosFuturoByIdAndDays, getIncomesByUserId, getOutflowsByUserId, getSchedulesIncomesByUserId, getSchedulesOutflowsByUserId,
    getIncomesByUserIdLimiter,getOutflowsByUserIdLimiter}
