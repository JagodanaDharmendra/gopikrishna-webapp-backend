const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        assessmentType: {
            type: mongoose.Schema.Types.String,
            default: "OT",
        },
        client_id: {
            type: mongoose.Schema.Types.String,
            trim: true,
            unique: true,
            required: true,
            dropDups: true
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
        draft: {
            type: mongoose.Schema.Types.Boolean,
            default: true,
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