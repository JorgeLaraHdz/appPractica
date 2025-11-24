db.productos.insertMany([
  { 
    "nombre": "Teclado Mecánico", 
    "categoria": "Hardware", 
    "precio": 45.00 
  },
  { 
    "nombre": "Monitor 24 Pulgadas", 
    "categoria": "Hardware", 
    "precio": 180.50 
  },
  { 
    "nombre": "Licencia Antivirus 1 Año", 
    "categoria": "Software", 
    "precio": 25.00 
  },
  { 
    "nombre": "Mouse Ergonómico", 
    "categoria": "Hardware", 
    "precio": 18.00 
  },
  { 
    "nombre": "Soporte de Aluminio", 
    "categoria": "Accesorios", 
    "precio": 32.00 
  },
  { 
    "nombre": "Auriculares Bluetooth", 
    "categoria": "Audio", 
    "precio": 55.00 
  },
  { 
    "nombre": "Office 365 Personal", 
    "categoria": "Software", 
    "precio": 69.99 
  },
  { 
    "nombre": "Webcam HD", 
    "categoria": "Hardware", 
    "precio": 40.00 
  }
]);
db.productos.find({})