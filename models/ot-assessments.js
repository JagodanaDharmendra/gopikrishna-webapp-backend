const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        assessmentType: {
            type: mongoose.Schema.Types.String,
            default: "OT",
        },
        client_id: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        therapist: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        assessment_date: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        presenting_complaints: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        milestone_development: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        behavior_cognition: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        cognitive_skills: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        kinaesthesia: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        created_on: {
            type: mongoose.Schema.Types.String,
            default: "",
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
        email_sent: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
        version: {
            type: mongoose.Schema.Types.Number,
            default: 0,
        },
        draft: {
            type: mongoose.Schema.Types.Boolean,
            default: true,
        },
    },
);

const OTAssessments = mongoose.model("ot-assessments", schema);

exports.OTAssessments = OTAssessments;