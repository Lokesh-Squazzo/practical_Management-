const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;
    const subject = new Subject({
      name,
      code,
      createdBy: req.user._id,
    });
    await subject.save();
    res.status(201).send(subject);
  } catch (error) {
    res.status(400).send({ message: "Error creating subject", error });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("createdBy", "name email");
    res.status(200).send(subjects);
  } catch (error) {
    res.status(500).send({ message: "Error fetching subjects", error });
  }
};

module.exports = { createSubject, getSubjects };
