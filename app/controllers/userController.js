const userMapper = require('../mappers/userMapper');
const emailValidator = require('email-validator');
const { v4: uuidv4 } = require('uuid');
const passwordServices = require('../services/passwordServices');
const capitalizeFirstLetter = require('../services/capitalizeFirstLetter');

const userController = {

    addUser: async (req, res) => {

        try {
            userData = req.body

            //On s'assure que toutes les informations requises sont présentes
            if (!userData.email || !userData.firstname || !userData.lastname || !userData.category) {
                res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
                return;
            }

            userData.firstname = capitalizeFirstLetter(userData.firstname.toLowerCase());
            userData.lastname = userData.lastname.toUpperCase();
            userData.email = userData.email.toLowerCase();
            userData.category = userData.category.toUpperCase();

            //On vérifie que la catégorie renseignée est valide
            if (userData.category !== 'ADMIN' && userData.category !== 'MEMBER' && userData.category !== 'PLAYER') {
                res.status(400).json({"message": `La catégorie de l'utilisateur doit être ADMIN, MEMBER ou PLAYER.`});
                return;
            }

            //On vérifie que l'email récupéré est valide
            const validEmail = emailValidator.validate(userData.email);
        
            if (!validEmail){
                res.status(400).json({"message": `Email non valide.`});
                return;
            }

            //On vérifie que l'email n'est pas déjà pris.

            const checkEmail = await userMapper.getUserByEmail(userData.email);

            if (checkEmail) {
                res.status(400).json({"message": `Un utilisateur avec cette adresse email existe déjà. id : ${checkEmail.id}`})
                console.log('test');
                return;
            }

            //on génère un token
            userData.token = uuidv4();

            const newUser = await userMapper.addUser(userData);
            res.status(200).json({"message": `L'utilisateur a bien été ajouté.`, "newUser":  newUser});

            // On envoie un mail au nouveau user avec un lien lui permettant de configurer son password
            await passwordServices.passwordMail(userData.token, userData.email, userData.firstname, userData.lastname);

        } catch(err) {
            res.status(400).json({"message": err.message})
        }

    },

    getAllUsers: async (req, res) => {
        try {
        const users = await userMapper.getAllUsers();
        res.status(200).json(users)
        } catch(err) {
            res.status(400).json({"message": err.message})
        }
    },

    getUserById : async (req, res) => {
        const  id = Number(req.params.id);
        try {
            const user = await userMapper.getUserById(id);
            res.status(200).json(user)
        } catch(err) {
            res.status(400).json({"message": err.message})
        }
    },

    editUser : async (req, res) => {
        const id = Number(req.params.id);
        let userData = req.body;
        userData.id = id;


        try {
            
            //On s'assure que toutes les informations requises sont présentes
            if (!userData.email || !userData.firstname || !userData.lastname || !userData.category) {
                res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
                return;
            }
            
            userData.firstname = capitalizeFirstLetter(userData.firstname);
            userData.lastname = userData.lastname.toUpperCase();
            userData.email = userData.email.toLowerCase();
            userData.category = userData.category.toUpperCase();

            //On vérifie que la catégorie renseignée est valide
            if (userData.category !== 'ADMIN' && userData.category !== 'MEMBER' && userData.category !== 'PLAYER') {
                res.status(400).json({"message": `La catégorie de l'utilisateur doit être ADMIN, MEMBER ou PLAYER.`});
                return;
            }

            //On vérifie que l'email récupéré est valide
            const validEmail = emailValidator.validate(userData.email);
        
            if (!validEmail){
                res.status(400).json({"message": `Email non valide.`});
                return;
            }

            //On vérifie que l'email n'est pas déjà pris.

            const checkEmail = await userMapper.getUserByEmail(userData.email);

            console.log(checkEmail);

            if (checkEmail && checkEmail !== userData.id) {
                res.status(400).json({"message": `Un utilisateur avec cette adresse email existe déjà. id : ${checkEmail.id}`})
                console.log('test');
                return;
            }

            modifiedUser = await userMapper.editUser(userData);
            res.status(200).json({"message": `L'utilisateur a bien été modifié.`, "modifiedUser": modifiedUser});

    } catch(err) {
        res.status(400).json({"message": err.message});
    }
},

    deleteUser : async (req, res) => {
        const id = Number(req.params.id);

        try {
            const isUser = await userMapper.getUserById(id);
        
            if(!isUser) {
                res.status(400).json({"message": "Il n'y a pas d'utilisateur avec cet id."});
            }
            else {
                const deletedUser = await userMapper.deleteUser(id);
    
                res.status(400).json({"message": "L'utilisateur a bien été supprimé.", "deletedUser": isUser})
            } 

        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    }

};


module.exports = userController