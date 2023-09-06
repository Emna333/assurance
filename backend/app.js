//express framework BE JS
const express = require('express');

//creates express application
const app = express();

//import body-parser module

const bodyParser = require('body-parser');

//import mongoose module

const mongoose = require('mongoose');

//import multer module
const multer = require('multer');

//import path module
const path = require('path');

//import bcrypt module
const bcrypt = require('bcrypt');

//import nodemailer module

const nodemailer = require('nodemailer');
//import uuid module

const uuid = require('uuid');



// mongodb://127.0.0.1:27017=@ de base du serveur mongoDB(Port 27017)
mongoose.connect('mongodb://127.0.0.1:27017/assuranceDB');

// app configuration

//send json response
app.use(bodyParser.json());
//get object from request
app.use(bodyParser.urlencoded({ extended: true }));


// Security configuration

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(

        'Access-Control-Allow-Headers',

        'Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn'

    );

    res.setHeader(

        'Access-Control-Allow-Methods',

        'GET, POST, DELETE, OPTIONS, PATCH, PUT'

    );

    next();

});

//configuration des fichiers

// ShortCut :remplace backend/images avec myFiles
app.use("/myFiles", express.static(path.join("backend/images")));

// Media Types
const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "application/pdf": "pdf",
};
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + "-" + Date.now() + "-Star-" + "." + extension;
        cb(null, imgName);
    },
});


//Models Importation


const User = require('./models/user');

// BL signup
app.post('/api/users/signup', multer({ storage: storageConfig }).single('file'),
    (req, res) => {
        let user;
        console.log('here into BL signup', req.body);
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            if (req.body.role == 'agent') {
                req.body.photo = "http://localhost:3005/myFiles/" + req.file.filename;
                 user = new User(req.body);

            } 
            else {
                 user = new User(req.body);

            }
            console.log('here crypted pwd', cryptedPwd);
            user.save(
                (err, doc) => {
                    if (err) {
                        res.json({ msg: 'Error with signup' });

                    } else {
                        res.json({ msg: 'Added with success' });
                    }
                }

            );
        });
    });




//Business Logic:Login
// 0=> Phone Nbr Error
// 1=> pwd Error
// 2 => welcome
app.post('/api/users/login', (req, res) => {
    console.log('here into BL login', req.body);
    let user;
    User.findOne({$or: [{ phone: req.body.phone }, { email: req.body.email },{ phone1: req.body.phone1 }, {phone2: req.body.phone2 }]}).then((doc) => {
        console.log('here response after login', doc);
        user = doc;
        if (!doc) {
            res.json({ msg: '0' });
        } else {
            return bcrypt.compare(req.body.pwd, doc.pwd);
        }
    })
        //pas de ; ici 
        .then(
            (checkPwd) => {
                console.log('here check pwd', checkPwd);
                if (!checkPwd) {
                    res.json({ msg: '1' });
                }
                else {
                   
                        let userToSend = {
                            id: user._id,
                            nom: user.nom,
                            role: user.role
                        };
                        res.json({ msg: '2', connectedUser: userToSend });
                   
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ msg: 'An error occurred' }); // Handle errors
            });
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
    console.log('here into BL contact admin');

    // Send email notification to admin
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mariemjulia3333@gmail.com',
            pass: 'vkwirlkaserpjucm'
        }
    });

    let mailOptions = {
        from: 'mariemjulia3333@gmail.com',
        to: req.body.email,
        subject: 'Contact Form Submission',
        text: `Name: ${req.body.nom}\nMessage: ${newUuid = uuid.v4()} `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.json({ msg: 'error' });

        } else {
            console.log('Email sent:', info.response);
            res.json({ msg: 'Email sent successfully' });

        }
    });
});

//make app exportable
module.exports = app;


