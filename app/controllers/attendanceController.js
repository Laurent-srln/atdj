const attendanceMapper = require('../mappers/attendanceMapper');
const eventMapper = require('../mappers/eventMapper');
const userMapper = require('../mappers/userMapper');
const jsonwebtoken = require('jsonwebtoken');

const attendanceController = {

    addSelfAttendance : async (req, res) => {

        try {
            let { userId } = jsonwebtoken.decode(req.headers.authorization.substring(7));
            userId = Number(userId);
            const eventId = Number(req.params.eventId);
            console.log(req.params);
            const newAttendance = await attendanceMapper.addAttendance({userId, eventId});

            res.status(200).json({"message": "La participation a bien été ajoutée.", "attendance": newAttendance})


        } catch(err) {
            res.status(400).json({"message": err.message});
        }

    },

    addOtherAttendance : async (req, res) => {

        try {
            const userId = Number(req.params.userId);
            const eventId = Number(req.params.eventId);

            const newAttendance = await attendanceMapper.addAttendance({userId, eventId});

            res.status(200).json({"message": "La participation a bien été ajoutée.", "attendance": newAttendance})


        } catch(err) {
            res.status(400).json({"message": err.message});
        }

    },

    getAttendancesByUserId : async (req, res) => {
        try {
            let userId = Number(req.params.userId);
            const events = await eventMapper.getEventsByUserId(userId);
            res.status(200).json(events)
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    },

    getAttendancesByEventId : async (req, res) => {
        try {
            let eventId = Number(req.params.eventId);
            const users = await userMapper.getUsersByEventId(eventId);
            res.status(200).json(users)
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    },

    deleteAttendance : async (req,res) => {
        try {
            const eventId = Number(req.params.eventId);
            const userId = Number(req.params.userId);
            const deletedAttendance = await attendanceMapper.deleteAttendance({ eventId, userId });
            res.status(200).json({"message": "La participation a bien été supprimée.", "deletedAttendance": deletedAttendance})
        } catch(err) {
            res.status(400).json({"message": err.message});        }
    }

};


module.exports = attendanceController