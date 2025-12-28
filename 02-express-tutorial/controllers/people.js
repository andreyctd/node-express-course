const { people } = require("../data");

/* -------------------- GET ALL PEOPLE -------------------- */
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

/* -------------------- ADD PERSON -------------------- */
const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({ id: people.length + 1, name });
  res.status(201).json({ success: true, name });
};

/* -------------------- GET PERSON BY ID -------------------- */
const getPerson = (req, res) => {
  const personId = Number(req.params.id);
  const person = people.find((p) => p.id === personId);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  res.status(200).json({ success: true, data: person });
};

/* -------------------- UPDATE PERSON -------------------- */
const updatePerson = (req, res) => {
  const personId = Number(req.params.id);
  const { name } = req.body;

  const person = people.find((p) => p.id === personId);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  person.name = name;
  res.status(200).json({ success: true, data: people });
};

/* -------------------- DELETE PERSON -------------------- */
const deletePerson = (req, res) => {
  const personId = Number(req.params.id);
  const personExists = people.find((p) => p.id === personId);

  if (!personExists) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  const newPeople = people.filter((p) => p.id !== personId);
  people.length = 0;
  people.push(...newPeople);

  res.status(200).json({ success: true, data: people });
};

module.exports = {
  getPeople,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
