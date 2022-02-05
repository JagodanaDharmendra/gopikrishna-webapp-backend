const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        assessmentType: {
            type: mongoose.Schema.Types.String,
            default: "ST",
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
            type: mongoose.Schema.Types.String,
            default: "",
        },
        daddling: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        first_word: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        main_mode_comm: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        family_history: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        motor_developments: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        oro_peripheral_mechanism: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        vegetative_skills: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        vision: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        hearing: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        response_to_name_call: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        environmental_sounds: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        eye_contact: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        attention_to_sound: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        limitation_to_body_movements: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        limitation_to_speech: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        attention_level: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        social_smile: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        initiate_interaction: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        receptive_lang: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        expressive_lang: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        test_administered: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        reels_rl_score: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        reels_el_score: {
            type: mongoose.Schema.Types.String,
            default: "",
        },
        provisional_diagnosis: {
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

schema.statics.create = async ({
    name,
}) => {
    const assessment = new STAssessments({
        name,
    });
    return await assessment.save();
};

const STAssessments = mongoose.model("st-assessments", schema);

exports.STAssessments = STAssessments;