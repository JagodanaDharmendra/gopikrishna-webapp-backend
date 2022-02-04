const { v4: uuidv4 } = require('uuid');
const { Client, BTAssessments, STAssessments, OTAssessments } = require("../models");

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
        const client_id = uuidv4();
        const userId = req.body.UserId;
        const currentTime = new Date().toISOString();
        const client = new Client({
            client_id: client_id,
            created_on: currentTime,
            created_by: userId,
            modified_on: currentTime,
            modified_by: userId,
            ...req.body
        });
        await client.save();

        {//create assessments
            (await new BTAssessments({
                client_id: client_id,
                created_on: currentTime,
                created_by: userId,
                modified_on: currentTime,
                modified_by: userId,
            })).save();

            (await new STAssessments({
                client_id: client_id,
                created_on: currentTime,
                created_by: userId,
                modified_on: currentTime,
                modified_by: userId,
            })).save();

            (await new OTAssessments({
                client_id: client_id,
                created_on: currentTime,
                created_by: userId,
                modified_on: currentTime,
                modified_by: userId,
            })).save();
        }
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
        console.log(req);
        const updatedBody = {
            created_on: new Date().toISOString(),
            created_by: req.body.UserId,
            ...req.body,
            modified_on: new Date().toISOString(),
            modified_by: req.body.UserId,
        }
        console.log(updatedBody);
        const result = await Client.updateOne(
            { client_id: req.body.client_id }, updatedBody, { upsert: true })
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