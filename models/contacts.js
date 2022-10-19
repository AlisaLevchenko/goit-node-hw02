const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const createError = require("../helpers/error");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactsList);
  } catch (err) {
    return console.error(err);
  }
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const hasFindContact = contactsList.find(
    (contact) => contact.id === contactId.toString()
  );
  return hasFindContact;
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const contactToRemove = allContacts.find(
      (contact) => contact.id === contactId.toString()
    );
    const newContactsList = JSON.stringify(
      allContacts.filter((contact) => contact.id !== contactId.toString())
    );
    fs.writeFile(contactsPath, newContactsList);

    return contactToRemove;
  } catch (err) {
    return console.error(err);
  }
}

async function addContact(name, email, phone) {
  const newContact = await listContacts();
  try {
    const allContacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    const newContactsList = JSON.stringify([...allContacts, newContact]);
    fs.writeFile(contactsPath, newContactsList);
    return newContact;
  } catch (err) {
    return console.error(err);
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw createError(404, "Not found");
  }

  contacts[index].name = name;
  contacts[index].email = email;
  contacts[index].phone = phone;

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
