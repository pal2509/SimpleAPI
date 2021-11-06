const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken"); //JWT
var bcrypt = require("bcryptjs");


//Login de um user
exports.signin = (req, res) => {
    //Encontrar o nome
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            //Caso não encontre nada
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            //Fazer hash da password e comparar o resultado ao da base de dados
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            //Criar um token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(res.send({ message: "User was registered successfully!" }))
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};