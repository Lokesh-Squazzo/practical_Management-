const express = require("express");
const { createSubject, getSubjects } = require("../controllers/subjectController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, authorize(["Admin"]), createSubject);
router.get("/get", auth, getSubjects);

module.exports = router;
