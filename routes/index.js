const express = require("express");
const { User, Client, Assessments } = require("../controllers");

const router = express.Router();

//User Login and Logout
router.post('/login', User.login);
router.post('/logout', User.logout);

//User Create, Edit and View
router.post('/user/create', User.create);
router.post('/user/edit', User.update);
router.post('/user/delete', User.deleteUser);
router.get('/user/find', User.find);
router.get('/user/findAll', User.findAll);

//Client Create, Edit and View
router.post('/client/create', Client.create);
router.post('/client/edit', Client.update);
router.post('/client/delete', Client.deleteClient);
router.get('/client/find', Client.find);
router.get('/client/findAll', Client.findAll);

//Assessments Create, Edit, View and email
router.post('/assessment/create', Assessments.create);
router.post('/assessment/edit', Assessments.update);
router.get('/assessment/findAll', Assessments.findAll);
router.get('/assessment/findAllForClient', Assessments.findAllForClient);
router.get('/assessment/findAsPDF', Assessments.findAsPDF);
router.post('/assessment/email', Assessments.email);

module.exports = router;
