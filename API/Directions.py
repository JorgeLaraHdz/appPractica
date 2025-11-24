from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
import BackEnd.Functions as CallMethod
import BackEnd.GlobalInfo.ResponseMessages as respuestas

app = Flask(__name__)
CORS(app)

@app.route('/getAllUsers',methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def getUsers():
    try:
        objResult=CallMethod.fnGetAllUsers()
        return objResult
    except Exception as e:
        print("No se pudo leer los usuarios")
        return jsonify(respuestas.err500)

@app.route('/login',methods=["POST"])
@cross_origin(allow_headers=['Content-Type'])
def postLogin():
    try:
        email=request.json['email']
        password=request.json['password']
        objResult=CallMethod.fnPostLogin(email, password)
        return objResult
    except Exception as e:
        print("No se pudo leer los usuarios")
        return jsonify(respuestas.err500)

@app.route('/registro',methods=["POST"])
@cross_origin(allow_headers=['Content-Type'])
def postRegistro():
    try:
        email=request.json['email']
        password=request.json['password']
        objResult=CallMethod.fnPostRegistro(email, password)
        return objResult
    except Exception as e:
        print("No se pudo leer los usuarios")
        return jsonify(respuestas.err500)

@app.route('/getProducts',methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def getProducts():
    try:
        objResult=CallMethod.fnGetProducts()
        return objResult
    except Exception as e:
        print("No se pudo leer los productos")
        return jsonify(respuestas.err500)

@app.route('/delProducto/<id>',methods=["DELETE"])
@cross_origin(allow_headers=['Content-Type'])
def deleteProduct(id):
    try:
        objResult=CallMethod.fnDelProduct(id)
        return objResult
    except Exception as e:
        print("No se pudo eliminar el producto")
        return jsonify(respuestas.err500)

if __name__ == '__main__':
    app.run("0.0.0.0",3000)
