const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

//Função para verificação se o token é válido ou não
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]; //Token que vem no header

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    //Usar o jwt para verificar se o token é valido
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;