const conexion = require('../connection')

function addOutflow({amount,startDate,endDate,status,description,idType,idUser}){
    let query = `INSERT INTO outflow (amount,startDate,endDate,status,description,idType,idUser) values (?,?,?,?,?,?,?);`
    return conexion.runQuery(query,[amount,startDate,endDate,status,description,idType,idUser]);
}
function getOutflowdById(id){
    let query = `SELECT * FROM outflow WHERE idOutflow = ?;`
    return conexion.runQueryRow(query,[id]);
}
function deleteOutflowById(id){
    let query = `Delete FROM outflow WHERE idOutflow = ?;`
    return conexion.runQueryRow(query,[id]);
}
module.exports = {addOutflow,getOutflowdById,deleteOutflowById} 