const express = require("express");
const {
  createPractical,
  getPracticals,
  enrollInPractical,
} = require("../controllers/practicalController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, authorize(["Teacher"]), createPractical);
router.get("/get", auth, getPracticals);
router.post("/enroll", auth, authorize(["Student"]), enrollInPractical);

module.exports = router;
