const mongoose = require('mongoose');
const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/myNotebook').then(()=>console.log("Database is connected"))     
}


module.exports = connectToMongo;     
