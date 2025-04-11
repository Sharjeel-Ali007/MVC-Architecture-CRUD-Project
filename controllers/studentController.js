const Joi = require("joi");
const Student = require("../models/studentModel");

exports.getAllStudents = (req, res) => {
  Student.getAll((err, result) => {
    if (err) return res.status(500).send("Error finding students");
    res.send(result);
  });
};

exports.getStudentById = (req, res) => {
  Student.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Error finding student");
    if (result.length === 0) return res.status(404).send("Student not found");
    res.send(result[0]);
  });
};

exports.createStudent = (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Student.create(req.body.name, (err, result) => {
    if (err) return res.status(500).send("Error creating student");
    res.send({ id: result.insertId, name: req.body.name });
  });
};

exports.updateStudent = (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Student.update(req.params.id, req.body.name, (err, result) => {
    if (err) return res.status(500).send("Error updating student");
    if (result.affectedRows === 0)
      return res.status(404).send("Student not found");
    res.send({ id: req.params.id, name: req.body.name });
  });
};

exports.deleteStudent = (req, res) => {
  Student.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Error deleting student");
    if (result.affectedRows === 0)
      return res.status(404).send("Student not found");
    res.send("Student deleted");
  });
};

function validateStudent(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(student);
}
