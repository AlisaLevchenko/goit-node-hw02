const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", updateContactController);

module.exports = router;
