const express = require("express");
const router = express.Router();

const {
  getPeople,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

/* GET all people */
router.get("/", getPeople);

/* POST a new person */
router.post("/", addPerson);

/* GET person by ID */
router.get("/:id", getPerson);

/* UPDATE person by ID */
router.put("/:id", updatePerson);

/* DELETE person by ID */
router.delete("/:id", deletePerson);

module.exports = router;
