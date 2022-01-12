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

// Insert one InsurancePolicy
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

// Insert multiple InsurancePolicy
router.post("/postMultiple", async (req, res) => {
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
router.patch("/:username", async (req, res) => {
    try {
        const updatedInsurancePolicy = await InsurancePolicy.updateOne(
            { username: req.params.username },
            { $set: { property_value: req.body.property_value } }
        );
        res.json(updatedInsurancePolicy);
    } catch (error) {
        res.json({ message: error });
    }
});
module.exports = router;
