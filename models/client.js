const mongoose = require("mongoose");
const BTAssessments = require("./bt-assessments");
const STAssessments = require("./st-assessments");
const OTAssessments = require("./ot-assessments");

const schema = new mongoose.Schema(
    {
        client_id: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
        },
        mobile_no: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
        },
        name: {
            type: String,
            default: "",
        },
        gender: {
            type: String,
            default: "male",
            enum: ["male", "female", "other"],
        },
        dob: {
            type: mongoose.Schema.Types.Date,
            default: ""
        },
        alt_mobile_no: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
        },
        address: {
            type: String,
            default: "",
        },
        mother_tongue: {
            type: String,
            default: "",
        },
        f_name: {
            type: String,
            default: "",
        },
        m_name: {
            type: String,
            default: "",
        },
        discontinued: {
            type: String,
            default: "",
        },
        discontinued_on: {
            type: String,
            default: "",
        },
        created_on: {
            type: mongoose.Schema.Types.Date,
            default: ""
        },
        created_by: {
            type: String,
            default: "",
        },
        modified_on: {
            type: mongoose.Schema.Types.Date,
            default: ""
        },
        modified_by: {
            type: String,
            default: "",
        },
        branch: {
            type: String,
            default: "",
        },
        assessment: {
            type: String,
            default: "BT",
            enum: ["BT", "ST", "OT"],
        },
        chief_complaints: {
            type: mongoose.Schema.Types.Array,
            default: []
        },
        diagnosis: {
            type: String,
            default: "",
        },
        slot_time: {
            type: mongoose.Schema.Types.Array,
            default: []
        },
        therapy: {
            type: String,
            default: "BT",
            enum: ["BT", "ST", "OT", "PT", "SE"],
        },
    },
);

schema.statics.create = async ({
    mobile_no,
    name,
    gender,
    assessment
}) => {
    const client = new Client({
        name,
        mobile_no,
        gender,
        assessment
    });
    return await client.save();
};

schema.statics.findOne = async (client_id) => {
    return await Client.findOne({ client_id: client_id });
};

schema.statics.updateOne = async (client_id, values) => {
    return await Client.updateOne({ client_id: client_id }, { ...values });
};

schema.statics.getAll = async (req) => {
    return await Client.find({})
        // .populate("user_id")
        .sort({ created_at: -1 })
        .skip(parseInt(req.query.skip || 0))
        .limit(parseInt(req.query.limit || 10))
        .lean();
};

schema.statics.createAssessments = async (client_id, assessmentsType, values) => {
    let assessment;

    switch (assessmentsType) {
        case "BT":
            assessment = new BTAssessments({ ...values, client_id: client_id });
            break;

        case "ST":
            assessment = new STAssessments({ ...values, client_id: client_id });
            break;

        case "OT":
            assessment = new OTAssessments({ ...values, client_id: client_id });
            break;
    }

    return await assessment.save();

};

schema.statics.updateAssessments = async (client_id, assessmentsType, values) => {
    switch (assessmentsType) {
        case "BT":
            return await BTAssessments.updateOne({ client_id: client_id }, { ...values });

        case "ST":
            return await STAssessments.updateOne({ client_id: client_id }, { ...values });

        case "OT":
            return await OTAssessments.updateOne({ client_id: client_id }, { ...values });
    }
};

schema.statics.getAssessments = async (client_id, assessmentsType) => {
    switch (assessmentsType) {
        case "BT":
            return await BTAssessments.findOne({ client_id: client_id }, {});

        case "ST":
            return await STAssessments.findOne({ client_id: client_id }, {});

        case "OT":
            return await OTAssessments.findOne({ client_id: client_id }, {});
    }
};

schema.statics.getAssessmentsAsPDF = async (client_id, assessmentsType) => {
    switch (assessmentsType) {
        case "BT":
            return await BTAssessments.findOne({ client_id: client_id }, {});

        case "ST":
            return await STAssessments.findOne({ client_id: client_id }, {});

        case "OT":
            return await OTAssessments.findOne({ client_id: client_id }, {});
    }
};

schema.statics.emailAssessment = async () => {
    //send emails
};

const Client = mongoose.model("clients", schema);

exports.Client = Client;