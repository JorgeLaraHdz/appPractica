from bson import ObjectId,json_util as j
from flask import jsonify
from pymongo import MongoClient
import BackEnd.GlobalInfo.ResponseMessages as respuestas
import BackEnd.GlobalInfo.Keys as ColabsKey

if ColabsKey.dbconn==None:
    mongoConnect=MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn=mongoConnect[ColabsKey.strDBConnection]
    dbTequilas=ColabsKey.dbconn["bebidas"]

def getAllTequilas():
    try:
        arrFinalColab = []
        objQuery = dbTequilas.find({})
        listVinos = list(objQuery)
        if len(listVinos) != 0:
            for objVino in listVinos:
                objFormateado={
                    "Nombre": objVino["Nombre"],
                    "Marca": objVino["Marca"],
                }
                arrFinalColab.append(objFormateado)
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)0