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
            default: null,
        },
        daddling: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        first_word: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        main_mode_comm: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        family_history: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        motor_developments: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        oro_peripheral_mechanism: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        vegetative_skills: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        vision: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        hearing: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        response_to_name_call: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        environmental_sounds: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        eye_contact: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        attention_to_sound: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        limitation_to_body_movements: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        limitation_to_speech: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        attention_level: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        social_smile: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        initiate_interaction: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        receptive_lang: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        expressive_lang: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        test_administered: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        reels_rl_score: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        reels_el_score: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        provisional_diagnosis: {
            type: mongoose.Schema.Types.String,
            default: null,
        },
        recommendations: {
            type: mongoose.Schema.Types.String,
            default: null,
        }
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