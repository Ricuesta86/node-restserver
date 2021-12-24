//========================================
// Puerto
//========================================
process.env.PORT = process.env.PORT || 3000;



//========================================
// Entorno
//========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================================
// Vencimiento del token
//========================================
// 60 segundo
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//========================================
// SEED de autenticación
//========================================

process.env.SEED = process.env.SEED || 'esta-es-la-semilla';


//========================================
// Base de datos
//========================================
let urlDB;

if (process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/cafe';
else
    urlDB = process.env.MONGO_URL;
// urlDB = 'mongodb+srv://cafe-user:Rroan.2017@cluster0.dc4mn.mongodb.net/cafe?retryWrites=true&w=majority';


process.env.URLDB = urlDB;
process.env.URLDB = urlDB;