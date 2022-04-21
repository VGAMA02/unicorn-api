const conexion = require('../connection')

function addIncome({amount,date,status,description,idType,idUser}){
    let query = `INSERT INTO income (amount,date,status,description,idType,idUser) values (?,?,?,?,?,?);`
    return conexion.runQuery(query,[amount,date,status,description,idType,idUser]);
}
function getIncomeById(id){
    let query = `SELECT * FROM income WHERE idIncome = ?;`
    return conexion.runQueryRow(query,[id]);
}
function deleteIncomeById(id){
    let query = `Delete FROM income WHERE idIncome = ?;`
    return conexion.runQueryRow(query,[id]);
}


module.exports = {addIncome,getIncomeById,deleteIncomeById} 