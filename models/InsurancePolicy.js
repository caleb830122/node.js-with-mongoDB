const mongoose = require("mongoose");

const InsurancePolicySchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    policy_number: {
        type: String,
        required: true,
    },
    effective_start: {
        type: String,
        required: true,
    },
    effective_end: {
        type: String,
        required: true,
    },
    property_value: {
        type: String,
        required: true,
    },
    premium: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("InsurancePolicies", InsurancePolicySchema);
