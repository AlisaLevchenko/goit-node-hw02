const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactService");

const {
  addContactSchema,
  updateContactSchema,
  schemaUpdateFavorite,
} = require("../schemas/createContactSchema");

const { bodyValidateSchema } = require("../schemas/bodyValidateSchema");

const objectIdSchema = require("../schemas/objectIdSchema");

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
    const { error } = objectIdSchema.validate(req.params.contactId);
    if (error) {
      next(error);
    }
    const contactById = await getContactById(req.params.contactId);
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    bodyValidateSchema(addContactSchema, req.body);
    const contact = await addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
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
const updateFavoriteController = async (req, res, next) => {
  try {
    validateRequestBody(schemaUpdateFavorite, req.body);
    const contact = await updateStatusContact(req.params.contactId, req.body);
    res.status(200).json(contact);
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
  updateFavoriteController,
};
