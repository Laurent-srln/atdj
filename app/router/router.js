const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const boardgameController = require('../controllers/boardgameController');
const eventController = require('../controllers/eventController');
const attendanceController = require('../controllers/attendanceController');
const attendanceMapper = require('../mappers/attendanceMapper');
const membershipController = require('../controllers/membershipController');
const gameController = require('../controllers/gameController');

//Auth routes
router.post('/register', authController.setPassword);
router.post('/forgotten-password', authController.getNewToken);
router.post('/login', authController.submitLogin);

//Users routes
router.post('/new-user', userController.addUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id(\\d+)', userController.getUserById);
router.put('/users/:id(\\d+)', userController.editUser);
router.delete('/users/:id(\\d+)', userController.deleteUser);

//Boardgames routes
router.post('/new-boardgame', boardgameController.addBoardgame);
router.get('/boardgames', boardgameController.getAllBoardgames);
router.get('/boardgames/:id', boardgameController.getABoardgameById);
router.put('/boardgames/:id', boardgameController.editBoardgame);
router.delete('/boardgames/:id', boardgameController.deleteBoardgame);

//Events routes
router.post('/new-event', eventController.addEvent);
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.editEvent);
router.delete('/events/:id', eventController.deleteEvent);

//Attendances routes
router.post(`/new-attendance/:eventId`, attendanceController.addSelfAttendance);
router.post(`/new-attendance/:eventId/:userId`, attendanceController.addOtherAttendance);
router.get(`/attendances/:userId`, attendanceController.getAttendancesByUserId);
router.get(`/attendances/events/:eventId`, attendanceController.getAttendancesByEventId);
router.delete(`/attendances/:eventId/:userId`, attendanceController.deleteAttendance);

//Memberships routes
router.post(`/new-membership`, membershipController.addMembership);
router.get(`/memberships`, membershipController.getAllMemberships);
router.get(`/validMemberships`, membershipController.getAllValidMemberships);
router.get(`/memberships/:userId`, membershipController.getAllMembershipsByUserId);
router.get(`/validMembership/:userId`, membershipController.getValidMembershipByUserId);
router.delete(`/memberships/:membershipId`, membershipController.deleteMembership);

//Games routes
router.post(`/new-game`, gameController.addGame);

module.exports = router;