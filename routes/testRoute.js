const express = require("express");

const router = express.Router();

const testController = require("../controllers/testController");

// router.post("/test-assessement-l1", testController.testAssessmentL1);
router.post("/test-assessement-l2", testController.testAssessmentL2);

module.exports = router;
