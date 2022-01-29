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
    },
);

schema.statics.create = async ({
    name,
}) => {
    const assessment = new OTAssessments({
        name,
    });
    return await assessment.save();
};

const OTAssessments = mongoose.model("ot-assessments", schema);

exports.OTAssessments = OTAssessments;