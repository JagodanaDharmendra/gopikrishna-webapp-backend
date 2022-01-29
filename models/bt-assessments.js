const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        client_id: {
            type: mongoose.Schema.Types.Number,
            default: 0,
        },
        therapist: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        assessment_date: {
            type: mongoose.Schema.Types.Date,
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
            type: mongoose.Schema.Types.Date,
            default: null
        },
        created_by: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        modified_on: {
            type: mongoose.Schema.Types.Date,
            default: null
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
    },
);

schema.statics.create = async ({
    name,
}) => {
    const assessment = new BTAssessments({
        name,
    });
    return await assessment.save();
};

const BTAssessments = mongoose.model("bt-assessments", schema);

exports.BTAssessments = BTAssessments;