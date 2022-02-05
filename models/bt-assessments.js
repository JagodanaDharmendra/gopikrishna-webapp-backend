const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        assessmentType: {
            type: mongoose.Schema.Types.String,
            default: "BT",
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
        prenatal_history: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        family_history: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        development_history: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        school_history: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        tests_administered: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        behavior_observation: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        test_results: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        impression: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        recommendations: {
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

const BTAssessments = mongoose.model("bt-assessments", schema);

exports.BTAssessments = BTAssessments;