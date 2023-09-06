//import mongoose module
const mongoose = require('mongoose');

//create schema
const userSchema = mongoose.Schema({
    nom: String,
    email: String, 
    phone: String,
    role: String,
    photo: String,
    phone1: String,
    phone2: String,
});
//affectation d'un nom de modele pour le schema
const user = mongoose.model('User', userSchema);

//make match exportable
module.exports = user;