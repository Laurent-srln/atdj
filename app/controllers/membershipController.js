const membershipMapper = require('../mappers/membershipMapper');
const jsonwebtoken = require('jsonwebtoken');

const membershipController = {
    addMembership : async (req, res) => {

        try {

            if (!req.headers.authorization || !jsonwebtoken.decode(req.headers.authorization.substring(7))) {
                res.status(400).json({"message": `Un token doit être fourni.`});
                return;
            }

            if (!req.body.userId || !req.body.startDate || !req.body.endDate) {
                res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
                return;
            }

            let { userId : createdBy } = jsonwebtoken.decode(req.headers.authorization.substring(7));
            let { userId, startDate, endDate } = req.body;
            createdBy = Number(createdBy);
            userId = Number(userId);

            const newMembership = await membershipMapper.addMembership(userId, startDate, endDate, createdBy);

            res.status(200).json({"message": "L'adhésion a bien été ajoutée.", "membership": newMembership})
        } catch(err) {
            res.status(400).json({"message": err.message});
        }

    },

    getAllMemberships : async (req, res) => {


        try {
            const memberships = await membershipMapper.getAllMemberships();
            
            res.status(200).json(memberships)
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    },

    getAllValidMemberships : async (req, res) => {


        try {
            const memberships = await membershipMapper.getAllValidMemberships();
            
            res.status(200).json(memberships)
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    },

    getAllMembershipsByUserId : async (req, res) => {

        const userId = req.params.userId;

        try {
            const memberships = await membershipMapper.getAllMembershipsByUserId(userId);
            
            res.status(200).json(memberships)
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    },

    getValidMembershipByUserId : async (req, res) => {

        const userId = req.params.userId;

        try {
            const membership = await membershipMapper.getValidMembershipByUserId(userId);
            
            res.status(200).json(membership)
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    },

    deleteMembership : async (req, res) => {

        try {
            const membershipId = Number(req.params.membershipId);
            const deletedMembership = await membershipMapper.deleteMembership(membershipId);
            
            res.status(200).json({"message": "L'adhésion a bien été supprimée.", "deletedMembership": deletedMembership})
        } catch(err) {
            res.status(400).json({"message": err.message});
        }



    }
};


module.exports = membershipController