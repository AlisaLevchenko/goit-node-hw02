const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (contactById) res.status(200).json(contactById);
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact) {
    res.json({ message: "contact deleted" });
  } else res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    if (!body) {
      res.status(400).json({ message: "missing fields" });
    } else {
      const updatedContact = await updateContact(req.params.contactId, body);
      res.json(updatedContact);
    }
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
