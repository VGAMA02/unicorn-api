const conexion = require('../connection');


//SELECT amount,description,idCategory FROM scheduledinput a WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%")) AND A.idCategory = 7 AND a.idUser = 4 AND (ISNULL(endDate) or endDate = '0000-00-00')


///ASIGNAR CATEGORIAS
function updateSchedulesDiversion(id){
    let query = `UPDATE scheduledinput a set idCategory = 7 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 7) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
function updateSchedulesHigiene(id){
    let query = `UPDATE scheduledinput a set idCategory = 6 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 6) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
function updateSchedulesrRopa(id){
    let query = `UPDATE scheduledinput a set idCategory = 5 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 5) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
function updateSchedulesTransporte(id){
    let query = `UPDATE scheduledinput a set idCategory = 4 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 4) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
function updateSchedulesCasa(id){
    let query = `UPDATE scheduledinput a set idCategory = 3 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 3) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
function updateSchedulesCuentasPagos(id){
    let query = `UPDATE scheduledinput a set idCategory = 2 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 2) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
function updateSchedulesAlimentacion(id){
    let query = `UPDATE scheduledinput a set idCategory = 1 WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%") AND b.idCategory = 1) AND (ISNULL(a.idCategory) or a.idCategory = 8);`
    return conexion.runQuery(query,[id]);
}
//CONSEGUIR POR CATEGORIA
function getSchedulesAnaliticsByCategory(id,Category){
    let query = `SELECT * FROM scheduledinput a WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%")) AND A.idCategory = ? AND  a.idUser = ? AND (ISNULL(endDate) or endDate = '0000-00-00');`
    return conexion.runQuery(query,[Category,id]);
}
function getSchedulesAnaliticsByCategoryLimiter(id,Category,limiter,opcion){
    let query;
    if (opcion == 0){
        query = `SELECT * FROM scheduledinput a WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%")) AND A.idCategory = ? AND  a.idUser = ? AND (ISNULL(endDate) or endDate = '0000-00-00') ORDER BY a.amount DESC LIMIT ?;`
    }
    else{
        query = `SELECT * FROM scheduledinput a WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%")) AND A.idCategory = ? AND  a.idUser = ? AND (ISNULL(endDate) or endDate = '0000-00-00') ORDER BY a.amount ASC LIMIT ?;`
    }
    return conexion.runQuery(query,[Category,id,limiter]);
}

function getSchedulesAnaliticsByCategory(id,Category){
    let query = `SELECT * FROM scheduledinput a WHERE EXISTS (SELECT * FROM diccionario b WHERE a.description like CONCAT("%", b.Palabra,"%")) AND A.idCategory = ? AND  a.idUser = ? AND (ISNULL(endDate) or endDate = '0000-00-00');`
    return conexion.runQuery(query,[Category,id]);
}

function getSchedulesAdviceTransport(id){
    let query = `SELECT * FROM scheduledinput WHERE idUser = ?  AND (description LIKE "%taxi%" OR description LIKE "%uber%") AND idCategory = 4`
    return conexion.runQuery(query,[id]);
}
function getSchedulesAdviceWork(id){
    let query = `SELECT * FROM scheduledinput WHERE idUser = ?  AND (description LIKE "%Nomina%" OR description LIKE "%Trabajo%")`;
    return conexion.runQuery(query,[id]);
}

function getOK(){
    let query = `CALL Up_UpdateScheduledSingleInputs();`
    return conexion.runQuery(query);
}

module.exports = {updateSchedulesDiversion,getSchedulesAnaliticsByCategory,getSchedulesAnaliticsByCategoryLimiter,getSchedulesAdviceTransport,getSchedulesAdviceWork,getOK
,updateSchedulesHigiene,updateSchedulesrRopa,updateSchedulesTransporte,updateSchedulesCasa,updateSchedulesCuentasPagos,updateSchedulesAlimentacion} 