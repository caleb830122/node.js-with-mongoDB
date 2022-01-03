const express = require("express");
const { json } = require("express/lib/response");

const router = express.Router();
const InsurancePolicy = require("../models/InsurancePolicy");

// Get All InsurancePolicys
router.get("/", async (req, res) => {
    try {
        const insurancePolicys = await InsurancePolicy.find();
        res.json(insurancePolicys);
    } catch (err) {
        res.json({ message: err });
    }
});

// policy_number: {
//     type: String,
//     required: true,
// },
// effective_start: {
//     type: Date,
//     required: true,
// },
// effective_end: {
//     type: Date,
//     required: true,
// },
// property_value: {
//     type: String,
//     required: true,
// },
// premium: {
//     type: String,
//     required: true,
// },

// InsurancePolicy one InsurancePolicy
router.post("/", async (req, res) => {
    const insurancePolicy = new InsurancePolicy({
        username: req.body.username,
        policy_number: req.body.policy_number,
        effective_start: req.body.effective_start,
        effective_end: req.body.effective_end,
        property_value: req.body.property_value,
        premium: req.body.premium,
    });
    try {
        const savedInsurancePolicy = await insurancePolicy.save();
        res.json(savedInsurancePolicy);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get InsurancePolicy by username
router.get("/:username", async (req, res) => {
    try {
        const InsurancePolicys = await InsurancePolicy.find({
            username: req.params.username,
        });
        res.json(InsurancePolicys);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get InsurancePolicy by ID
router.get("/:InsurancePolicyID", async (req, res) => {
    try {
        const InsurancePolicys = await InsurancePolicy.findById(
            req.params.InsurancePolicyID
        );
        res.json(InsurancePolicys);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete InsurancePolicy by ID
router.delete("/:InsurancePolicyID", async (req, res) => {
    try {
        const removedInsurancePolicy = await InsurancePolicy.deleteOne({
            _id: req.params.InsurancePolicyID,
        });
        res.json(removedInsurancePolicy);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Update a InsurancePolicy
router.patch("/:InsurancePolicyID", async (req, res) => {
    try {
        const updatedInsurancePolicy = await InsurancePolicy.updateOne(
            { _id: req.params.InsurancePolicyID },
            { $set: { title: req.body.title } }
        );
        res.json(updatedInsurancePolicy);
    } catch (error) {
        res.json({ message: error });
    }
});
module.exports = router;
