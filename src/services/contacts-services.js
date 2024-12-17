import ContactCollection from "../db/models/Contact.js";

export const getContacts = ()=> ContactCollection.find();

export const getContactsById = id => ContactCollection.findById(id);