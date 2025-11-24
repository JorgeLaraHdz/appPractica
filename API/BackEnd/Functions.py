from bson import ObjectId,json_util as j
from flask import jsonify
from pymongo import MongoClient
import BackEnd.GlobalInfo.ResponseMessages as respuestas
import BackEnd.GlobalInfo.Keys as ColabsKey

if ColabsKey.dbconn==None:
    mongoConnect=MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn=mongoConnect[ColabsKey.strDBConnection]
    dbUsers=ColabsKey.dbconn["clUsers"]
    dbProducts=ColabsKey.dbconn["productos"]

def fnGetAllUsers():
    try:
        arrFinalColab = []
        objQuery = dbProducts.find({})
        listUsers = list(objQuery)
        if len(listUsers) != 0:
            for objUser in listUsers:
                objFormateado={
                    "Correo": objUser["strCorreo"],
                    "Nombre": objUser["strNombre"],
                    "Password": objUser["strPassword"],
                    "Rol": objUser["strRol"]
                }
                arrFinalColab.append(objFormateado)
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)

def fnPostLogin(email,password):
    try:
        objQuery = dbUsers.find_one({"strCorreo":email,"strPassword":password})
        if objQuery is None:
            objResponse = respuestas.err401.copy()
            return jsonify(objResponse)
        objResponse = respuestas.succ200.copy()
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)

def fnPostRegistro(email,password):
    try:
        objQuery = dbUsers.insert_one({"strCorreo":email,"strPassword":password,"strNombre":"","strRol":"Usuario"})
        if objQuery is None:
            objResponse = respuestas.err401.copy()
            return jsonify(objResponse)
        objResponse = respuestas.succ200.copy()
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)

def fnGetProducts():
    try:
        arrFinalColab = []
        objQuery = dbProducts.find({})
        listProducts = list(objQuery)
        if len(listProducts) != 0:
            for objProduct in listProducts:
                objFormateado={
                    "id":str(objProduct["_id"]),
                    "Nombre": objProduct["nombre"],
                    "Categoria": objProduct["categoria"],
                    "Precio": objProduct["precio"]
                }
                arrFinalColab.append(objFormateado)
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)
    
def fnDelProduct(id):
    try:
        print(type(id))
        objQuery = dbProducts.delete_one({"_id":ObjectId(id)})
        print(objQuery.deleted_count)
        if objQuery.deleted_count==0:
            objResponse = respuestas.err401.copy()
            return jsonify(objResponse)
        objResponse = respuestas.succ200.copy()
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)