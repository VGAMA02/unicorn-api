const conexion = require('../connection')

function addUser({firstName,lastName,email,birthDate,password}){
    let query = `INSERT INTO USER (firstName,lastName,email,birthDate,status,password) values (?,?,?,?,1,?);`
    return conexion.runQuery(query,[firstName,lastName,email,birthDate,password]);
}

function getUserByEmail(email){
    let query = `SELECT iduser FROM user WHERE email = ?;`;
    return conexion.runQueryRow(query,[email]);
}

function getUserById(id){
    let query = `SELECT user FROM user WHERE idUser = ?;`;
    return conexion.runQueryRow(query,[id]);
}

function changeUserStatus(id){
    let query = `UPDATE user SET status = false WHERE idUser = ? `;
    return conexion.runQueryRow(query,[id]);
}

function getPasswordByEmail(email){
    if(email == null){return false;}
    let query = `SELECT password FROM user WHERE email = ?`;
    return conexion.runQueryRow(query,[email]);
}

function getIdUserByEmail(email){
    console.log(email);
    if(email == null){return false;}
    let query = `SELECT idUser FROM user WHERE email = ?`;
    return conexion.runQueryRow(query,email);
}

module.exports = {addUser,getUserByEmail,getUserById,changeUserStatus,getPasswordByEmail,getIdUserByEmail} 