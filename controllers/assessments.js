const { sendMail } = require("../helpers/sendgrid-mail");

const { BTAssessments, STAssessments, OTAssessments, Client } = require("../models");

const { createPDF } = require("./createPDF");

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
};

const create = async (req, res) => {
    try {
        console.log(req.body);
        const { client_id, assessmentType, version } = req.body;
        const newValues = {
            ...req.body,
            created_on: new Date().toISOString(),
            created_by: req.body.UserId,
            modified_on: new Date().toISOString(),
            modified_by: req.body.UserId,
        };

        let assessment;

        switch (assessmentType) {
            case "BT":
                assessment = new BTAssessments({ ...newValues });
                break;

            case "ST":
                assessment = new STAssessments({ ...newValues });
                break;

            case "OT":
                assessment = new OTAssessments({ ...newValues });
                break;

            default:
                throw Error("Specify assessment type in body");

        }

        await assessment.save();

        await Client.updateOne({ client_id: client_id }, {
            [assessmentType.trim().toLowerCase()]: version,
            modified_on: new Date().toISOString(),
            modified_by: req.body.UserId,
        });

        // await assessment.save();
        let response = { ...defaultResponseObject };
        response.message = "Assessment created successfully";
        response.data = { ...assessment };
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
    try {
        //find client email
        const { client_id, assessmentType } = req.query;
        const result = await Client.find({ client_id: client_id }, "mobile_no name gender address email created_on created_by assessment chief_complaints diagnosis therapy").lean();
        if (!result || result.length == 0) {
            throw Error("No Client found for given client id:" + client_id);
        }
        const clientInfo = result[0];

        const fileName = `${client_id}-${assessmentType}.pdf`;

        //find assessment data
        let assessmentResult = [];
        let query = { client_id: client_id };
        let filter = "";
        switch (assessmentType) {
            case "BT":
                filter = "assessmentType assessment_date behavior_observation created_by created_on development_history family_history impression prenatal_history recommendations school_history test_results tests_administered therapist";
                assessmentResult = await BTAssessments.find(query, filter).lean();
                break;

            case "ST":
                filter = "assessment_date attention_level attention_to_sound daddling environmental_sounds expressive_lang eye_contact family_history first_word hearing initiate_interaction limitation_to_body_movements limitation_to_speech main_mode_comm motor_developments oro_peripheral_mechanism provisional_diagnosis receptive_lang recommendations reels_el_score reels_rl_score response_to_name_call social_smile test_administered therapist vegetative_skills vision";
                assessmentResult = await STAssessments.find(query, filter).lean();
                break;

            case "OT":
                filter = "assessment_date behavior_cognition cognitive_skills kinaesthesia milestone_development presenting_complaints therapist";
                assessmentResult = await OTAssessments.find(query, filter).lean();
                break;
        }

        //generate pdf;
        createPDF("Hello", clientInfo, "Assessments", assessmentResult[0], fileName);
        await sleep(1000);

        let response = { ...defaultResponseObject };
        response.message = "PDF fetched successfully";
        response.data = { fileName: fileName };
        res.status(200).send(response);
        // res.status(200).sendFile(publicPath);
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
        const { assessmentType } = req.query;
        let assessmentResult = [];

        switch (assessmentType) {
            case "BT":
                assessmentResult.push(...(await BTAssessments.find({})));
                break;

            case "ST":
                assessmentResult.push(...(await STAssessments.find({})));
                break;

            case "OT":
                assessmentResult.push(...(await OTAssessments.find({})));
                break;

            default:
                assessmentResult.push(...(await BTAssessments.find({})));
                assessmentResult.push(...(await STAssessments.find({})));
                assessmentResult.push(...(await OTAssessments.find({})));
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

const findForClient = async (req, res) => {
    try {
        console.log(req.query);
        const { assessmentType, client_id, version } = req.query;
        let assessmentResult = [];

        let query = { client_id: client_id, version: version };

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
    try {

        //find client email
        const { client_id, assessmentType } = req.body;
        const result = await Client.find({ client_id: client_id }, "mobile_no name gender address email created_on created_by assessment chief_complaints diagnosis therapy").lean();
        if (!result || result.length == 0) {
            throw Error("No Client found for given client id:" + client_id);
        }
        const clientInfo = result[0];
        const toEmail = result[0].email;

        const fileName = `${client_id}.pdf`;

        //find assessment data
        let assessmentResult = [];
        let query = { client_id: client_id };
        let filter = "";
        switch (assessmentType) {
            case "BT":
                filter = "email_sent assessmentType assessment_date behavior_observation created_by created_on development_history family_history impression prenatal_history recommendations school_history test_results tests_administered therapist";
                assessmentResult = await BTAssessments.find(query, filter).lean();
                break;

            case "ST":
                filter = "email_sent assessment_date attention_level attention_to_sound daddling environmental_sounds expressive_lang eye_contact family_history first_word hearing initiate_interaction limitation_to_body_movements limitation_to_speech main_mode_comm motor_developments oro_peripheral_mechanism provisional_diagnosis receptive_lang recommendations reels_el_score reels_rl_score response_to_name_call social_smile test_administered therapist vegetative_skills vision";
                assessmentResult = await STAssessments.find(query, filter).lean();
                break;

            case "OT":
                filter = "email_sent assessment_date behavior_cognition cognitive_skills kinaesthesia milestone_development presenting_complaints therapist";
                assessmentResult = await OTAssessments.find(query, filter).lean();
                break;
        }

        console.log(assessmentResult);

        if (assessmentResult.email_sent) {
            let response = { ...defaultResponseObject };
            response.message = "Email already sent";
            response.data = null;
            res.status(200).send(response);
        } else {
            //generate pdf;
            const finalFilePath = createPDF("Hello", clientInfo, "Assessments", assessmentResult[0], fileName);
            await sleep(1000);

            // send email
            const resultSendMail = await sendMail(toEmail, finalFilePath);
            const resultUpdateSentMail = await updateSentEmail(req, client_id, assessmentType);
            let response = { ...defaultResponseObject };
            response.message = "Data fetched successfully";
            response.data = { resultSendMail, resultUpdateSentMail };
            res.status(200).send(response);
        }
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

async function updateSentEmail(req, client_id, assessmentType) {
    let query = { client_id: client_id };
    let updated_values = {
        email_sent: true,
        draft: false,
        modified_on: new Date().toISOString(),
        modified_by: req.body.UserId,
    };

    switch (assessmentType) {
        case "BT":
            return await BTAssessments.updateOne(query, updated_values);

        case "ST":
            return await STAssessments.updateOne(query, updated_values);

        case "OT":
            return await OTAssessments.updateOne(query, updated_values);
    }
}

module.exports = {
    create,
    findAsPDF,
    findAll,
    findForClient,
    update,
    email
}