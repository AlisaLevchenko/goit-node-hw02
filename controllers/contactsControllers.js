const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts.js");
const {
  addContactSchema,
  updateContactSchema,
} = require("../schemas/createContactSchema");
const { bodyValidateSchema } = require("../schemas/bodyValidateSchema");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (contactById) res.status(200).json(contactById);
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};
const addContactController = async (req, res, next) => {
  try {
    bodyValidateSchema(addContactSchema, req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      const contact = await addContact(name, email, phone);
      res.status(201).json(contact);
    }
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const removedContact = await removeContact(req.params.contactId);
    if (removedContact) {
      res.json({ message: "contact deleted" });
    } else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    bodyValidateSchema(updateContactSchema, req.body);
    const { body } = req;
    if (JSON.stringify(body) == "{}") {
      res.status(400).json({ message: "missing fields" });
    } else {
      const updatedContact = await updateContact(req.params.contactId, body);
      res.json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
};
