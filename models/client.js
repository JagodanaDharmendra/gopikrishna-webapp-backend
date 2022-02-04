const mongoose = require("mongoose");
const BTAssessments = require("./bt-assessments");
const STAssessments = require("./st-assessments");
const OTAssessments = require("./ot-assessments");

const schema = new mongoose.Schema(
    {
        client_id: {
            type: mongoose.Schema.Types.String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
        },
        mobile_no: {
            type: mongoose.Schema.Types.String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
        },
        name: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        gender: {
            type: mongoose.Schema.Types.String,
            default: "male",
            enum: ["male", "female", "other"],
        },
        dob: {
            type: mongoose.Schema.Types.String,
            default: ""
        },
        alt_mobile_no: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        email: {
            type: mongoose.Schema.Types.String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
        },
        address: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        mother_tongue: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        f_name: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        m_name: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        discontinued: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        discontinued_on: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        created_on: {
            type: mongoose.Schema.Types.String,
            default: ""
        },
        created_by: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        modified_on: {
            type: mongoose.Schema.Types.String,
            default: ""
        },
        modified_by: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        branch: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        assessment: {
            type: mongoose.Schema.Types.Array,
            default: [],
        },
        chief_complaints: {
            type: mongoose.Schema.Types.String,
            default: ""
        },
        diagnosis: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        slot_time: {
            type: mongoose.Schema.Types.String,
            default: ""
        },
        therapy: {
            type: mongoose.Schema.Types.Array,
            default: [],
        },
    },
);

schema.statics.getAll = async (req) => {
    return await Client.find({})
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