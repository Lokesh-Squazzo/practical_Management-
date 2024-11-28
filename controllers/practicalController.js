const Practical = require("../models/Practical");

const createPractical = async (req, res) => {
  try {
    const { subjectId, title, description } = req.body;
    const practical = new Practical({
      subjectId,
      title,
      description,
      createdBy: req.user._id,
    });
    await practical.save();
    res.status(201).send(practical);
  } catch (error) {
    res.status(400).send({ message: "Error creating practical", error });
  }
};

const getPracticals = async (req, res) => {
  try {
    const practicals = await Practical.find()
      .populate("subjectId", "name code")
      .populate("createdBy", "name email")
      .populate("enrolledStudents", "name email");
    res.status(200).send(practicals);
  } catch (error) {
    res.status(500).send({ message: "Error fetching practicals", error });
  }
};

const enrollInPractical = async (req, res) => {
  try {
    const { practicalId } = req.body;
    const practical = await Practical.findById(practicalId);
    if (!practical) {
      return res.status(404).send({ error: "Practical not found" });
    }

    if (!practical.enrolledStudents.includes(req.user._id)) {
      practical.enrolledStudents.push(req.user._id);
      await practical.save();
    }

    res.status(200).send(practical);
  } catch (error) {
    res.status(500).send({ message: "Error enrolling in practical", error });
  }
};

module.exports = { createPractical, getPracticals, enrollInPractical };
