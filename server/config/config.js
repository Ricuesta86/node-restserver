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
// 6000 milisegundo
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 6000 * 60 * 24 * 30;

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

//========================================
// Google Client ID
//========================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '894521448125-1omu0uhbmmd6hva306kfj4bvj5u6o8d3.apps.googleusercontent.com';