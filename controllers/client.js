const { Client } = require("../models/client");
const { v4: uuidv4 } = require('uuid');

const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
};

const find = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const findAll = async (req, res) => {
    try {
        const result = await Client.find({})
            .sort({ created_at: -1 })
            .skip(parseInt(req.query.skip || 0))
            .limit(parseInt(req.query.limit || 10));
        let response = { ...defaultResponseObject };
        response.message = "Data fetched successfully";
        response.data = result;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

const create = async (req, res) => {
    try {
        console.log(req.body);
        const { name, mobile_no, email, assessment } = req.body;
        const client = new Client({
            client_id: uuidv4(),
            name: name,
            mobile_no: mobile_no,
            email: email,
            assessment: assessment
        });
        await client.save();
        let response = { ...defaultResponseObject };
        response.message = "Client created successfully";
        response.data = null;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

const update = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const deleteClient = async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        await Client.deleteOne({ email: email });
        let response = { ...defaultResponseObject };
        response.message = "Client deleted successfully";
        response.data = null;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

module.exports = {
    find,
    findAll,
    create,
    update,
    deleteClient
}