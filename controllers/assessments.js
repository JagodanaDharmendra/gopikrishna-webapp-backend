const { BTAssessments } = require("../models/bt-assessments");
const { STAssessments } = require("../models/st-assessments");
const { OTAssessments } = require("../models/ot-assessments");

const { v4: uuidv4 } = require('uuid');

const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
};

const create = async (req, res) => {
    try {
        console.log(req.body);
        const { client_id, assessmentType, values } = req.body;
        let assessmentResult;
        const newValues = { ...values, /*client_id: client_id */ };
        switch (assessmentType) {
            case "BT":
                // assessment = new BTAssessments(newValues);
                assessmentResult = await BTAssessments.updateOne({ client_id: client_id }, newValues, { upsert: true });
                break;

            case "ST":
                // assessment = new STAssessments(newValues);
                assessmentResult = await STAssessments.updateOne({ client_id: client_id }, newValues, { upsert: true });
                break;

            case "OT":
                // assessment = new OTAssessments(newValues);
                assessmentResult = await OTAssessments.updateOne({ client_id: client_id }, newValues, { upsert: true });
                break;
        }

        // await assessment.save();
        let response = { ...defaultResponseObject };
        response.message = "Assessment created successfully";
        response.data = { ...assessmentResult };
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

const findAsPDF = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const findAll = async (req, res) => {
    try {
        console.log(req.query);
        const { assessmentType } = req.query;
        let assessmentResult = [];

        switch (assessmentType) {
            case "BT":
                assessmentResult = await BTAssessments.find({});
                break;

            case "ST":
                assessmentResult = await STAssessments.find({});
                break;

            case "OT":
                assessmentResult = await OTAssessments.find({});
                break;

            default:
                assessmentResult.push(...await BTAssessments.find({}));
                assessmentResult.push(...await STAssessments.find({}));
                assessmentResult.push(...await OTAssessments.find({}));
                console.log(assessmentResult);
                break;
        }

        let response = { ...defaultResponseObject };
        response.message = "Assessment fetched successfully";
        response.data = assessmentResult;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}


const findAllForClient = async (req, res) => {
    try {
        console.log(req.query);
        const { assessmentType, client_id } = req.query;
        let assessmentResult = [];

        let query = { client_id: client_id };

        switch (assessmentType) {
            case "BT":
                assessmentResult = await BTAssessments.find(query);
                break;

            case "ST":
                assessmentResult = await STAssessments.find(query);
                break;

            case "OT":
                assessmentResult = await OTAssessments.find(query);
                break;

            default:
                assessmentResult.push(...await BTAssessments.find(query));
                assessmentResult.push(...await STAssessments.find(query));
                assessmentResult.push(...await OTAssessments.find(query));
                break;
        }

        // console.log(assessmentResult);
        let response = { ...defaultResponseObject };
        response.message = "Assessment fetched successfully";
        response.data = assessmentResult;
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

const email = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

module.exports = {
    create,
    findAsPDF,
    findAll,
    findAllForClient,
    update,
    email
}