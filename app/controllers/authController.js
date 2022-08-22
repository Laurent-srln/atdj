
const userMapper = require('../mappers/userMapper');
const authMapper = require('../mappers/authMapper');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = require('../services/jwtSecret');
const passwordServices = require('../services/passwordServices');

const authController = {

    setPassword : async (req, res) => {

        const { password, passwordConfirm } = req.body;
        const token = req.query.token;

        try {

        if (!password || !passwordConfirm) {
            return res.status(400).json({"message": "Tous les champs doivent être remplis."})
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({"message": "Les deux saisies doivent être identique."})
        }

        const foundToken = await authMapper.getToken(token);



        if(!foundToken) {
            return res.status(400).json({"message": "Profil non trouvé."})
        }
        
        const hashPassword = await bcrypt.hash(password, saltRounds);

        await authMapper.setPassword(token, hashPassword);
        res.status(200).json({"message": "Le nouveau mot de passe a bien été enregistré."});

        } catch(err) {
            res.status(400).json({"message": err.message});
            }

    },

    getNewToken : async (req, res) => {

        const { email } = req.body;

        try{

            if(!email) {
                res.status(400).json({"message": "Un email doit être saisi."});
                return;
            }

            const validEmail = emailValidator.validate(email);

            if (!validEmail){

                return res.status(400).json({"message": `L'email saisi est incorrect.`})
            }

                
            const result = await userMapper.getUserByEmail(email);
            
            if (!result){

                return res.status(400).json({"message": `L'email saisi est incorrect.`});
            }

            // On génère un nouveau token
            token = uuidv4();

            await authMapper.setNewToken(email, token);


            // On envoie un mail au nouveau user avec un lien lui permettant de configurer son password
            await passwordServices.newPasswordMail(token, email);

            res.status(200).json({"message": `Un email a été envoyé à ${email}.`});


        } catch(err) {
            res.status(400).json({"message": err.message});
            }
    },

    submitLogin : async (req, res) => {
            
        const { email, password } = req.body;

        try{

            if(!password || !email) {
                res.status(400).json({"message": "Tous les champs doivent être complétés."});
                return;
            }

            const validEmail = emailValidator.validate(email);

            if (!validEmail){


                return res.status(400).json({"message": `Email ou mot de passe incorrect.`})
            }

                
            const result = await authMapper.getUserAuthInfo(email);

            if (!result){

                return res.status(400).json({"message": `Email ou mot de passe incorrect.`});
            }

            await bcrypt.compare(password, result.password, function (err, isPasswordCorrect) {


                if (!isPasswordCorrect) {
                    res.status(400).json({"message": `Email ou mot de passe incorrect.`, "logged": false});
                    return;
                }

                if (isPasswordCorrect) {
                    const jwtContent = { userId: result.id, email: result.email, category: result.category }
                    const jwtOptions = {
                        algorithm: 'HS256',
                        expiresIn: '10h'
                    };
                
                res.status(200).json({ 
                    logged: true,
                    category: result.category,
                    token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions)});
                }

    })        
        } catch(err) {
        res.status(400).json({"message": err.message});
        }

    }

};


module.exports = authController