const { Client } = require("../models/client");
const { v4: uuidv4 } = require('uuid');

const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
};

const find = async (req, res) => {
    try {
        console.log(req.query);
        const { client_id } = req.query;
        const result = await Client.find({ client_id: client_id });
        console.log(result);
        let response = { ...defaultResponseObject };
        response.message = "Client fetched successfully";
        response.data = { ...result[0]._doc };
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
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
        const client = new Client({
            client_id: uuidv4(),
            ...req.body
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
    try {
        console.log(req.body);
        const result = await Client.updateOne({ client_id: req.body.client_id }, req.body, { upsert: true })
        let response = { ...defaultResponseObject };
        response.message = "Client updated successfully";
        response.data = { ...result };
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
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